module.exports = {
  tableName: "resource",

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    size: {
      type: 'integer',
      required: true
    },
    type: {
      type: 'string'
    },
    description: {
      type: 'string'
    }
  }
}
