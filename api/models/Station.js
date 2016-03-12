module.exports = {
  attributes: {
    identifier: {
      type: 'string',
      required: true,
      unique: true
    },

    name: {
      type: 'string',
      required: true
    },

    latitude: {
      type: 'float'
    },

    longitude: {
      type: 'float'
    },

    elevation: {
      type: 'float'
    },

    description: {
      type: 'string'
    },

    established: {
      type: 'date'
    }
  }
}
