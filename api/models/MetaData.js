module.exports = {
  tableName: "meta_data",

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
      columnName: "validation_regex",
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
