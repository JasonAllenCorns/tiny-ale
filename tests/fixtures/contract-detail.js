// GET /api/contracts/3?include=category,facilitator,assignments,meetings,creditAssignments,creditAssignments.credit,term,ealrs
export default {
  data: {
    id: '3',
    type: 'contract',
    attributes: {
      name: 'Pel crapula venustas repellat tametsi.',
      status: 'approved',
      learningObjectives: 'Utor taceo sonitus ut thema.',
      competencies: 'Delibero torrens aut beatus curriculum.',
      evaluationMethods: 'Contra conor laboriosam vesco amitto.',
      instructionalMaterials: 'Pax libero acer umbra calamitas.',
      location: 'Caute defaeco contego video itaque.',
      timeslots: [
        {
          start: '8:45',
          end: '10:30',
          weekdays: '01234',
        },
      ],
    },
    relationships: {
      enrollments: {
        data: [
          {
            id: '1',
            type: 'enrollment',
          },
          {
            id: '2',
            type: 'enrollment',
          },
        ],
      },
      facilitator: {
        data: {
          id: '1',
          type: 'User',
        },
      },
      term: {
        data: {
          id: '3',
          type: 'term',
        },
      },
      category: {
        data: {
          id: '1',
          type: 'category',
        },
      },
      assignments: {
        data: [
          {
            id: '1',
            type: 'assignment',
          },
          {
            id: '2',
            type: 'assignment',
          },
          {
            id: '3',
            type: 'assignment',
          },
          {
            id: '4',
            type: 'assignment',
          },
          {
            id: '5',
            type: 'assignment',
          },
        ],
      },
      creditAssignments: {
        data: [
          {
            id: '2',
            type: 'creditAssignment',
          },
        ],
      },
      meetings: {
        data: [
          {
            id: '1',
            type: 'meeting',
          },
          {
            id: '2',
            type: 'meeting',
          },
          {
            id: '3',
            type: 'meeting',
          },
          {
            id: '4',
            type: 'meeting',
          },
          {
            id: '5',
            type: 'meeting',
          },
        ],
      },
      ealrs: {
        data: [
          {
            id: '1',
            type: 'ealr',
          },
          {
            id: '2',
            type: 'ealr',
          },
          {
            id: '3',
            type: 'ealr',
          },
          {
            id: '4',
            type: 'ealr',
          },
        ],
      },
    },
  },
  included: [
    {
      id: '1',
      type: 'assignment',
      attributes: {
        name: 'Assignment 1',
        description: 'Here is assignment number 1',
        dueDate: '2019-09-02',
      },
      relationships: {
        turnins: {
          data: [
            {
              id: '1',
              type: 'turnin',
            },
          ],
        },
      },
    },
    {
      id: '2',
      type: 'assignment',
      attributes: {
        name: 'Assignment 2',
        description: 'Here is assignment number 2',
        dueDate: '2019-09-03',
      },
      relationships: {
        turnins: {
          data: [
            {
              id: '2',
              type: 'turnin',
            },
          ],
        },
      },
    },
    {
      id: '3',
      type: 'assignment',
      attributes: {
        name: 'Assignment 3',
        description: 'Here is assignment number 3',
        dueDate: '2019-09-04',
      },
      relationships: {
        turnins: {
          data: [
            {
              id: '3',
              type: 'turnin',
            },
          ],
        },
      },
    },
    {
      id: '4',
      type: 'assignment',
      attributes: {
        name: 'Assignment 4',
        description: 'Here is assignment number 4',
        dueDate: '2019-09-05',
      },
      relationships: {
        turnins: {
          data: [
            {
              id: '4',
              type: 'turnin',
            },
          ],
        },
      },
    },
    {
      id: '5',
      type: 'assignment',
      attributes: {
        name: 'Assignment 5',
        description: 'Here is assignment number 5',
        dueDate: '2019-09-06',
      },
      relationships: {
        turnins: {
          data: [
            {
              id: '5',
              type: 'turnin',
            },
          ],
        },
      },
    },
    {
      id: '1',
      type: 'category',
      attributes: {
        name: 'Category 1',
        sequence: 0,
        public: false,
        homeroom: false,
        statusable: false,
      },
    },
    {
      id: '2',
      type: 'creditAssignment',
      attributes: {
        creditHours: 1.0,
      },
      relationships: {
        credit: {
          data: {
            id: '1',
            type: 'credit',
          },
        },
      },
    },
    {
      id: '1',
      type: 'credit',
      attributes: {
        courseId: '0',
        courseName: 'Course 1',
        courseType: 0,
      },
    },
    {
      id: '1',
      type: 'ealr',
      attributes: {
        ealr: 'Curo thalassinus eius apto totus.',
        seq: '1.1',
        category: 'Category 1',
      },
    },
    {
      id: '2',
      type: 'ealr',
      attributes: {
        ealr: 'Communis candidus veniam cras incidunt.',
        seq: '1.2',
        category: 'Category 1',
      },
    },
    {
      id: '3',
      type: 'ealr',
      attributes: {
        ealr: 'Vindico accedo succedo ducimus ventosus.',
        seq: '2.1',
        category: 'Category 2',
      },
    },
    {
      id: '4',
      type: 'ealr',
      attributes: {
        ealr: 'Et aggredior tersus sordeo adaugeo.',
        seq: '2.2',
        category: 'Category 2',
      },
    },
    {
      id: '1',
      type: 'user',
      attributes: {
        firstName: 'Mark',
        lastName: 'Kuhn',
        nickname: null,
        dateActive: null,
        dateInactive: null,
        status: 'active',
        role: 'staff',
      },
      relationships: {
      },
    },
    {
      id: '1',
      type: 'meeting',
      attributes: {
        title: 'Attendance for Monday, 02 September 2019',
        meetingDate: '2019-09-02',
      },
      relationships: {
        meetingParticipants: {
          data: [
            {
              id: '1',
              type: 'meetingParticipant',
            },
            {
              id: '2',
              type: 'meetingParticipant',
            },
          ],
        },
      },
    },
    {
      id: '2',
      type: 'meeting',
      attributes: {
        title: 'Attendance for Tuesday, 03 September 2019',
        meetingDate: '2019-09-03',
      },
      relationships: {
        meetingParticipants: {
          data: [
            {
              id: '3',
              type: 'meetingParticipant',
            },
            {
              id: '4',
              type: 'meetingParticipant',
            },
          ],
        },
      },
    },
    {
      id: '3',
      type: 'meeting',
      attributes: {
        title: 'Attendance for Wednesday, 04 September 2019',
        meetingDate: '2019-09-04',
      },
      relationships: {
        meetingParticipants: {
          data: [
            {
              id: '5',
              type: 'meetingParticipant',
            },
            {
              id: '6',
              type: 'meetingParticipant',
            },
          ],
        },
      },
    },
    {
      id: '4',
      type: 'meeting',
      attributes: {
        title: 'Attendance for Thursday, 05 September 2019',
        meetingDate: '2019-09-05',
      },
      relationships: {
        meetingParticipants: {
          data: [
            {
              id: '7',
              type: 'meetingParticipant',
            },
            {
              id: '8',
              type: 'meetingParticipant',
            },
          ],
        },
      },
    },
    {
      id: '5',
      type: 'meeting',
      attributes: {
        title: 'Attendance for Friday, 06 September 2019',
        meetingDate: '2019-09-06',
      },
      relationships: {
        meetingParticipants: {
          data: [
            {
              id: '9',
              type: 'meetingParticipant',
            },
            {
              id: '10',
              type: 'meetingParticipant',
            },
          ],
        },
      },
    },
    {
      id: '3',
      type: 'term',
      attributes: {
        name: 'Current One',
        schoolYear: 2019,
        creditDate: null,
        months: [
          '2019-09-01',
          '2019-10-01',
          '2019-11-01',
          '2019-12-01',
          '2020-01-01',
        ],
        status: 'active',
      },
    },
  ],
};
