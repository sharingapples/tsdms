module.exports = {
  attributes: {
    name: {
      type: 'string',
      unique: true
    },
    description: {
      type: 'string'
    },
    providesUniqueness: {
      type: 'boolean'
    },
    starred: {
      type: 'boolean'
    }
  }
}
