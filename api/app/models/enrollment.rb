# frozen_string_literal: true

class Enrollment < ApplicationRecord
  require './lib/tiny_privileges'

  # Enrollments have four possible states. The state transitions are as follows.
  #
  # Proposed - Active, Drop (destroy)
  # Active - Closed (fulfilled), Closed (canceled)
  # Closed - Active, Finalized (fulfilled), Finalized (canceled)
  # Finalized - cannot change state

  belongs_to :participant, foreign_key: 'participant_id', class_name: 'User'
  belongs_to :contract
  belongs_to :creator, foreign_key: 'creator_id', class_name: 'User'

  has_many :notes, as: :notable, dependent: :destroy
  has_many :statuses, as: :statusable, dependent: :destroy do
    def make(month, user)
      Status.make(month, proxy_owner, user)
    end
  end

  has_many :turnins, dependent: :destroy

  has_many :meeting_participants, dependent: :destroy

  has_many :credit_assignments, -> { where(' ((user_id IS NOT NULL) OR ((user_id IS NULL) AND (enrollment_finalized_on IS NULL)))') }, dependent: :destroy

  # so contract timeslots can be set on enrollment report queries
  attr_accessor :timeslots

  ROLE_STUDENT = 0
  ROLE_INSTRUCTOR = 1
  ROLE_FACILITATOR = 2

  # Name constants for role values
  ROLE_NAMES = {
    ROLE_STUDENT => 'Student',
    ROLE_INSTRUCTOR => 'Instructor'
  }.freeze

  # Note, these are in ascending order of accessibility.
  # Any enrollment_status >= STATUS_ENROLLED indicates accessibility.
  # enrollment requested
  STATUS_PROPOSED = 0

  # enrollment approved
  STATUS_ENROLLED = 1

  # enrollment completed or canceled
  STATUS_CLOSED = 2

  # enrollment finalized and off limits to facilitator
  STATUS_FINALIZED = 3

  # Name constants for enrollment_status levels
  STATUS_NAMES = { STATUS_PROPOSED => 'Pending',
                   STATUS_ENROLLED => 'Enrolled',
                   STATUS_CLOSED => 'Closed',
                   STATUS_FINALIZED => 'Finalized' }.freeze

  # enrollment not complete yet
  COMPLETION_UNKNOWN = 0

  # student canceled enrollment
  COMPLETION_CANCELED = 1

  # student successfully completed contract
  COMPLETION_FULFILLED = 2

  # name constants for completion types
  COMPLETION_NAMES = { COMPLETION_UNKNOWN => 'Incomplete',
                       COMPLETION_CANCELED => 'Canceled',
                       COMPLETION_FULFILLED => 'Fulfilled' }.freeze

  scope :uncanceled, -> { conditions("completion_status != #{COMPLETION_CANCELED}") }
  scope :unfinalized, -> { conditions("enrollment_status != #{STATUS_FINALIZED}") }

  # status methods

  def can_cancel?
    [STATUS_ENROLLED, STATUS_PROPOSED].include? enrollment_status
  end

  def enrolled?
    enrollment_status == STATUS_ENROLLED
  end

  def finalized?
    enrollment_status == STATUS_FINALIZED
  end

  def closed?
    enrollment_status == STATUS_CLOSED
  end

  def canceled?
    (closed? || finalized?) && completion_status == COMPLETION_CANCELED
  end

  def fulfilled?
    finalized? && completion_status == COMPLETION_FULFILLED
  end

  def finalized_fulfilled?
    finalized? && completion_status == COMPLETION_FULFILLED
  end

  def status_description
    if [STATUS_FINALIZED, STATUS_CLOSED].include? enrollment_status
      COMPLETION_NAMES[completion_status]
    else
      STATUS_NAMES[enrollment_status]
    end
  end

  # activates enrollment

  def set_active(user)
    # to set active, user must have privileges, AND enrollment must be either proposed or closed, or, if finalized, must have been canceled, not
    # fulfilled.

    privs = privileges(user)
    unless privs[:edit] &&
           (
             [STATUS_PROPOSED, STATUS_CLOSED].include?(enrollment_status) ||
             (enrollment_status == STATUS_FINALIZED && completion_status == COMPLETION_CANCELED)
           )
      raise TinyException, 'You lack sufficient privileges'
    end

    if finalized? # assume it was canceled and is being reinstated. set credits back to unfinalized state.
      credit_assignments.each do |ca|
        ca.enrollment_unfinalize
      end
    end

    self.completion_date = nil
    self.completion_status = COMPLETION_UNKNOWN
    self.enrollment_status = STATUS_ENROLLED
    self.finalized_on = nil
    save!

    true
  end

  # sets enrollment closed

  def set_closed(completion_status, user, date = Time.now.gmtime)
    privs = privileges(user)

    unless can_cancel? && privs[:edit]
      raise TinyException, 'Insufficient privileges'
    end

    self.completion_date = date
    self.completion_status = completion_status
    self.enrollment_status = STATUS_CLOSED
    self.finalized_on = nil
    save!
    true
  end

  def set_finalized(user, date = Time.now.gmtime)
    return false if enrollment_status != Enrollment::STATUS_CLOSED

    raise TinyException, 'Insufficient privileges' unless user.admin?

    # if self.finalized_on?
    #   UserMailer.deliver_trouble_report "Finalizing enrollment that already has a finalized_on stamp", user, {:enrollment => self, :student => self.participant, :contract => self.contract}
    # end
    update_attributes(enrollment_status: STATUS_FINALIZED, finalized_on: date)

    # fixup the credits
    credit_assignments.each do |ca|
      ca.enrollment_finalize(completion_status, participant, contract, date)
    end

    true
  end

  # performs a student enrollment, setting the enrollment_status
  # appropriately depending on the enrolling user's privileges.
  #
  def self.enroll_student(contract, student, user, privs = nil)
    # Bail out if we can't get authentication
    TinyException.raise_exception(TinyException::SECURITYHACK) if user.nil?

    # Bail out if the user is already enrolled
    if student.enrollments.where(contract_id: contract.id).count > 0
      TinyException.raise_exception(TinyException::ENROLL_DUPLICATE, user)
    end

    # get the privs
    privs ||= contract.privileges(user)

    # Bail out if the class isn't enrolling and user doesn't have privileges to edit
    # the enrollment
    unless privs[:edit]
      TinyException.raise_exception(TinyException::ENROLL_UNAVAILABLE, user)
    end

    # Bail out if a student is trying to enroll another student (or staff member)
    if user.privilege < User::PRIVILEGE_STAFF
      TinyException.raise_exception(TinyException::NOPRIVILEGES, user)
    end

    # Enroll the student with status PROPOSED if the current user is not the owner of
    # the contract. Otherwise, enroll the student with status ENROLLED.
    Enrollment.enroll_user(contract, student, user, role: Enrollment::ROLE_STUDENT, enrollment_status: contract.facilitator_id == user.id ? Enrollment::STATUS_ENROLLED : nil)
  end

  def inherit_credits(c = nil)
    c ||= contract
    credit_assignments.clear
    credit_assignments << c.credit_assignments.collect { |c| CreditAssignment.new(credit: c.credit, credit_hours: c.credit_hours) }
  end

  protected

  # This helper function performs the actual enrollment function. All the
  # error checking is already done.

  def self.enroll_user(contract, participant, user, options = {})
    e = Enrollment.new(participant: participant,
                       creator: user,
                       completion_status: COMPLETION_UNKNOWN)
    e.enrollment_status = options[:enrollment_status] || Enrollment::STATUS_PROPOSED
    e.role = options[:role] || Enrollment::ROLE_STUDENT

    unless participant.privilege > User::PRIVILEGE_STUDENT
      e.inherit_credits(contract)
    end

    contract.enrollments << e

    contract.activate if contract.closed?

    e
  end

  public

  def absences
    meeting_participants.find(:all, conditions: "participation in (#{MeetingParticipant::ABSENT}, #{MeetingParticipant::TARDY})", include: [:meeting], order: 'meetings.meeting_date DESC')
  end

  # returns a friendly status string for the enrollment

  def status_text
    s = Enrollment::STATUS_NAMES[enrollment_status]

    if [Enrollment::STATUS_CLOSED, Enrollment::STATUS_FINALIZED].include? enrollment_status
      s += "-#{Enrollment::COMPLETION_NAMES[completion_status]}"
    end
    s
  end

  # returns an array of friendly credit strings

  def credit_strings
    if credit_assignments.empty?
      ['No credits assigned.']
    else
      credit_assignments.collect { |c| c.credit_string }
    end
  end

  # Return a hash describing privileges of the specified user

  def self.privileges(user)
    # new privs object with no grants
    p = TinyPrivileges.new

    # user must be specified
    return p if user.nil?

    # allow creation privileges for students on up
    p[:create] = user.privilege >= User::PRIVILEGE_STUDENT
    p
  end

  # Return a hash describing privileges of the specified user
  # on this enrollment

  def privileges(user)
    # create a new privileges object with no rights
    p = TinyPrivileges.new

    # user must be specified
    return p if user.nil?

    # an admin has full privileges
    return p.grant_all if user.admin?
    return p.grant_all if user == contract.facilitator

    ##########################################
    # see if the user has an enrollment role on the contract here
    user_role = contract.role_of(user)

    ##########################################
    # USER IS NOT ENROLLED
    # if no role, then check for staff privileges
    if user_role.nil?

      # staff members can view and do notes
      # non-staff, non-enrolled user has no privileges
      p[:browse] =
        p[:view] =
          p[:create_note] =
            p[:view_students] =
              p[:view_note] = (user.privilege == User::PRIVILEGE_STAFF)

      return p
    end

    ##########################################
    # USER IS ENROLLED
    # FOR EDIT PRIVILEGES,
    # user must be instructor
    p[:edit] = (user_role >= Enrollment::ROLE_INSTRUCTOR)

    # FOR VIEW, NOTE PRIVILEGES,
    # user must be an instructor or a supervisor or the enrolled student
    p[:view] =
      p[:create_note] =
        p[:view_note] =
          p[:browse] = ((user_role >= Enrollment::ROLE_INSTRUCTOR) ||
                        (user.id == participant.id))

    # an instructor or supervisor can edit a note
    p[:view_students] = # bogus since an enrollment only deals with one student
      p[:edit_note] = user_role >= Enrollment::ROLE_INSTRUCTOR
    p
  end

  def self.statusable(contract_ids, shallow)
    includes = [:participant]
    includes += %i[contract statuses] unless shallow

    conditions = ['(users.privilege < ?)', '(completion_status <> ?)']
    parameters = [User::PRIVILEGE_STAFF, Enrollment::COMPLETION_CANCELED]
    if contract_ids.is_a?(Array)
      return [] if contract_ids.empty?

      conditions << "contract_id in (#{contract_ids.join(',')})"
    else
      conditions << 'contract_id = ?'
      parameters << contract_ids
    end

    Enrollment.find(:all, order: 'users.last_name, users.nickname, users.first_name',
                          conditions: [conditions.join(' and ')] + parameters,
                          include: includes)
  end

  def self.with_extras(enrollments)
    q = []
    q << '('
    q <<  'SELECT DISTINCT enrollments.id'
    q <<  'FROM enrollments'
    q <<  'INNER JOIN turnins ON enrollments.id = turnins.enrollment_id'
    q <<  'WHERE enrollments.id IN (?)'
    q << ')'
    q << 'UNION'
    q << '('
    q <<  'SELECT DISTINCT enrollments.id'
    q <<  'FROM enrollments'
    q <<  "INNER JOIN meeting_participants ON enrollments.id = meeting_participants.enrollment_id AND meeting_participants.participation IN (#{MeetingParticipant::ABSENT},#{MeetingParticipant::TARDY})"
    q <<  'WHERE enrollments.id IN (?)'
    q << ')'
    ids = find_by_sql([q.join(' '), enrollments, enrollments])
    ids.collect { |e| e.id }
  end
end
