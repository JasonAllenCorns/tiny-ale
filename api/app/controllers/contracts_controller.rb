# frozen_string_literal: true

class ContractsController < ApiBaseController
  PERMITTED_INCLUDES = %w[category facilitator assignments meetings credit_assignments credit_assignments.credit term learning_requirements].freeze

  def index
    limit = params[:limit] || Rails.configuration.constants[:DEFAULT_LIMIT]

    order = (params[:order] || '').split(',').map(&:underscore).join(',')

    conditions = {}

    if params[:schoolYear]
      conditions[:term_id] = Term
                             .where(school_year: params[:schoolYear])
                             .select(:id)
                             .collect(&:id)
    end

    conditions[:contract_id] = params[:contractIds] if params[:contractIds]

    conditions[:category_id] = params[:categoryIds] if params[:categoryIds]

    if params[:facilitatorIds]
      conditions[:facilitator_id] = params[:facilitatorIds]
    end
    conditions[:term_id] = params[:termIds] if params[:termIds]

    if params[:status]
      conditions[:contract_status] = case params[:status].downcase
                                     when 'proposed'
                                       Contract::STATUS_PROPOSED
                                     when 'active'
                                       Contract::STATUS_ACTIVE
                                     when 'closed'
                                       Contract::STATUS_CLOSED
                                     when 'all'
                                       nil
                                     else
                                       return render json: { message: 'invalid status parameter' }, status: 400
      end
    end
    conditions.delete :contract_status if conditions[:contract_status].nil?

    result = Contract
             .where(conditions)
             .order(Arel.sql(order))
             .limit(limit)
    count = Contract.where(conditions).count

    options = {
      meta: {
        count: count
      },
      include: included_models,
      fields: { contract: %i[name status ] }
    }

    render json: ContractSerializer.new(result, options)
  end

  def show
    contract = Contract.find params[:id]

    render json: ContractSerializer.new(contract,
                                        include: included_models)
  end

  def create
    facilitator_params = new_contract_facilitator

    @contract = Contract.create
    @contract.creator = current_user

    update_contract

    render json: ContractSerializer.new(contract, include: [:facilitator, :category, :ealrs, :term])
  end

  def update

  end

  def destroy

  end

protected
  def contract_attributes
    params
      .require(:data)
      .require(:attributes)
      .permit(:name, :learning_objectives, :competencies, :evaluation_methods, :instructional_materials)
  end

  [:facilitator, :category, :term].each do |relation|
    self.define_method("contract_#{relation}") do
      params
        .dig(:data, :relationships, relation, :data, :id)
    end
  end

  def update_contract
    @contract.facilitator = User.find contract_facilitator if contract_facilitator
    @contract.category = Category.find contract_category if contract_category
    @contract.term = Term.find contract_term if contract_term
    @contract.update_status contract_attributes[:status]

    learning_requirements = params.dig(:data, :relationships, :learning_requirements, :data)
    if learning_requirements
      contract.ealrs.clear
      contract.ealrs << Ealr.find(:all, :conditions => ["id in (?)", learning_requirements.map{|c| c[:id]}])
    end
    
    contract.update_attributes! contract_attributes
  end

  def included_models
    if params[:include]
      return params[:include].split(',').map(&:underscore) & ContractsController::PERMITTED_INCLUDES
    end
    nil
  end
end
