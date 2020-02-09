
export const productTypes = [
  {
    name: 'name',
    type: 'string',
  },
  {
    name: 'phase',
    type: 'table',
    options:
    {
      types: [
        {
          name: 'name',
          type: 'string'
        },
        {
          name: 'count',
          type: 'number',
        },
        {
          name: 'skills',
          type: 'table',
          options: {
            types: [
              {
                name: 'skill',
                type: 'string',
                options:
                {
                  options: undefined,
                  map: undefined,
                  remap: undefined,
                }
              }
            ]
          }
        }
      ]
    }
  }

];
