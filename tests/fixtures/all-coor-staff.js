// GET /api/staff?status=active&coordinators=true&order=lastName,firstName
export default {
  data: [
    {
      id: '2',
      type: 'user',
      attributes: {
        firstName: 'Evita',
        lastName: 'Haley',
        nickname: null,
        dateActive: null,
        dateInactive: null,
        status: 'active',
        role: 'staff',
      },
      relationships: {
        coordinatees: {
          data: [
            {
              id: '6',
              type: 'student',
            },
            {
              id: '7',
              type: 'student',
            },
          ],
        },
      },
    },
    {
      id: '1',
      type: 'user',
      attributes: {
        firstName: 'Gabriella',
        lastName: 'Hegmann',
        nickname: null,
        dateActive: null,
        dateInactive: null,
        status: 'active',
        role: 'staff',
      },
      relationships: {
        coordinatees: {
          data: [
            {
              id: '5',
              type: 'student',
            },
          ],
        },
      },
    },
  ],
  meta: {
    count: 2,
  },
};
