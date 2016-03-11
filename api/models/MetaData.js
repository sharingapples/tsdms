module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    caption: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    validationRegex: {
      type: 'string'
    },
    seq: {
      type: 'integer'
    },
    important: {
      type: 'boolean'
    }
  }
}
