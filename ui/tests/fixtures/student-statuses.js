// GET /api/statuses?limit=-1&months=2019-09-01%2C2019-10-01%2C2019-11-01%2C2019-12-01%2C2020-01-01%2C2020-02-01%2C2020-03-01%2C2020-04-01%2C2020-05-01%2C2020-06-01&studentIds=323
export default {
  data: [
    {
      id: '133',
      type: 'status',
      attributes: {
        month: '2019-09-01',
        createdAt: '2019-11-15T00:00:00.000Z',
        updatedAt: '2019-11-15T00:00:00.000Z',
        fteHours: 25,
        metFteRequirements: true,
        heldPeriodicCheckins: true,
        academicStatus: 'satisfactory',
        attendanceStatus: 'satisfactory',
      },
      relationships: {
        creator: {
          data: {
            id: '319',
            type: 'user',
          },
        },
        statusable: {
          data: {
            id: '323',
            type: 'user',
          },
        },
      },
    },
    {
      id: '136',
      type: 'status',
      attributes: {
        month: '2019-10-01',
        createdAt: '2019-11-15T00:00:00.000Z',
        updatedAt: '2019-11-15T00:00:00.000Z',
        fteHours: 25,
        metFteRequirements: true,
        heldPeriodicCheckins: true,
        academicStatus: 'satisfactory',
        attendanceStatus: 'satisfactory',
      },
      relationships: {
        creator: {
          data: {
            id: '319',
            type: 'user',
          },
        },
        statusable: {
          data: {
            id: '323',
            type: 'user',
          },
        },
      },
    },
  ],
  included: [
    {
      id: '319',
      type: 'user',
      attributes: {
        firstName: 'Armanda',
        lastName: 'Heaney',
        nickname: null,
        dateActive: '2012-09-01',
        dateInactive: null,
        districtId: null,
        districtGrade: 12,
        email: 'cyrilkuhic@stoltenbergstehr.org',
        name: 'Armanda Heaney',
        status: 'active',
        role: 'staff',
      },
      relationships: {
        coordinatees: {
          data: [
            {
              id: '323',
              type: 'user',
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
