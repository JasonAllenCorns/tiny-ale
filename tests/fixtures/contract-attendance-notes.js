// GET /api/notes?notableType=meetingParticipant&notableIds=1,3,5,7,9,2,4,6,8,10
export default {
  data: [
    {
      id: '62',
      type: 'note',
      attributes: {
        note: 'Note by Boyle for student Buckridge / meeting 1',
        updatedAt: '2019-04-09T04:38:09.000Z',
      },
      relationships: {
        notable: {
          data: {
            id: '1',
            type: 'meetingParticipant',
          },
        },
        creator: {
          data: {
            id: '1',
            type: 'User',
          },
        },
      },
    },
    {
      id: '63',
      type: 'note',
      attributes: {
        note: 'Note by Boyle for student Doyle / assignment 1',
        updatedAt: '2019-04-09T04:38:09.000Z',
      },
      relationships: {
        notable: {
          data: {
            id: '2',
            type: 'meetingParticipant',
          },
        },
        creator: {
          data: {
            id: '1',
            type: 'User',
          },
        },
      },
    },
    {
      id: '64',
      type: 'note',
      attributes: {
        note: 'Note by Boyle for student Buckridge / meeting 2',
        updatedAt: '2019-04-09T04:38:09.000Z',
      },
      relationships: {
        notable: {
          data: {
            id: '3',
            type: 'meetingParticipant',
          },
        },
        creator: {
          data: {
            id: '1',
            type: 'User',
          },
        },
      },
    },
    {
      id: '65',
      type: 'note',
      attributes: {
        note: 'Note by Boyle for student Doyle / assignment 2',
        updatedAt: '2019-04-09T04:38:09.000Z',
      },
      relationships: {
        notable: {
          data: {
            id: '4',
            type: 'meetingParticipant',
          },
        },
        creator: {
          data: {
            id: '1',
            type: 'User',
          },
        },
      },
    },
    {
      id: '66',
      type: 'note',
      attributes: {
        note: 'Note by Boyle for student Buckridge / meeting 3',
        updatedAt: '2019-04-09T04:38:09.000Z',
      },
      relationships: {
        notable: {
          data: {
            id: '5',
            type: 'meetingParticipant',
          },
        },
        creator: {
          data: {
            id: '1',
            type: 'User',
          },
        },
      },
    },
    {
      id: '67',
      type: 'note',
      attributes: {
        note: 'Note by Boyle for student Doyle / assignment 3',
        updatedAt: '2019-04-09T04:38:09.000Z',
      },
      relationships: {
        notable: {
          data: {
            id: '6',
            type: 'meetingParticipant',
          },
        },
        creator: {
          data: {
            id: '1',
            type: 'User',
          },
        },
      },
    },
    {
      id: '68',
      type: 'note',
      attributes: {
        note: 'Note by Boyle for student Buckridge / meeting 4',
        updatedAt: '2019-04-09T04:38:09.000Z',
      },
      relationships: {
        notable: {
          data: {
            id: '7',
            type: 'meetingParticipant',
          },
        },
        creator: {
          data: {
            id: '1',
            type: 'User',
          },
        },
      },
    },
    {
      id: '69',
      type: 'note',
      attributes: {
        note: 'Note by Boyle for student Doyle / assignment 4',
        updatedAt: '2019-04-09T04:38:09.000Z',
      },
      relationships: {
        notable: {
          data: {
            id: '8',
            type: 'meetingParticipant',
          },
        },
        creator: {
          data: {
            id: '1',
            type: 'User',
          },
        },
      },
    },
    {
      id: '70',
      type: 'note',
      attributes: {
        note: 'Note by Boyle for student Buckridge / meeting 5',
        updatedAt: '2019-04-09T04:38:09.000Z',
      },
      relationships: {
        notable: {
          data: {
            id: '9',
            type: 'meetingParticipant',
          },
        },
        creator: {
          data: {
            id: '1',
            type: 'User',
          },
        },
      },
    },
    {
      id: '71',
      type: 'note',
      attributes: {
        note: 'Note by Boyle for student Doyle / assignment 5',
        updatedAt: '2019-04-09T04:38:09.000Z',
      },
      relationships: {
        notable: {
          data: {
            id: '10',
            type: 'meetingParticipant',
          },
        },
        creator: {
          data: {
            id: '1',
            type: 'User',
          },
        },
      },
    },
  ],
  included: [
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
  ],
  meta: {
    count: 10,
  },
};
