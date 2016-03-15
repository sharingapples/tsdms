module.exports = {
  tableName: "tag",

  attributes: {
    name: {
      type: 'string',
      unique: true
    },
    description: {
      type: 'string'
    },
    providesUniqueness: {
      columnName: "provides_uniqueness",
      type: 'boolean'
    },
    starred: {
      type: 'boolean'
    }
  }
}
