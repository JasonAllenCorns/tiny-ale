// GET /api/students
export default {
  data: [
    {
      id: '11',
      type: 'user',
      attributes: {
        firstName: 'Leatrice',
        lastName: 'Bednar',
        nickname: null,
        dateActive: '2018-08-01',
        dateInactive: null,
        districtId: '2870279804',
        districtGrade: 12,
        status: 'active',
        role: 'student',
      },
      relationships: {
        coordinator: {
          data: {
            id: '7',
            type: 'user',
          },
        },
      },
    },
    {
      id: '12',
      type: 'user',
      attributes: {
        firstName: 'Garry',
        lastName: 'Pollich',
        nickname: null,
        dateActive: '2018-08-01',
        dateInactive: null,
        districtId: '1780983772',
        districtGrade: 12,
        status: 'active',
        role: 'student',
      },
      relationships: {
        coordinator: {
          data: {
            id: '8',
            type: 'user',
          },
        },
      },
    },
    {
      id: '13',
      type: 'user',
      attributes: {
        firstName: 'Bernice',
        lastName: 'Yundt',
        nickname: null,
        dateActive: '2018-08-01',
        dateInactive: '2019-10-01',
        districtId: '5621269128',
        districtGrade: 12,
        status: 'inactive',
        role: 'student',
      },
      relationships: {
        coordinator: {
          data: {
            id: '8',
            type: 'user',
          },
        },
      },
    },
  ],
  meta: {
    count: 3,
  },
};
