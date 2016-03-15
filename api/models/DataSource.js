module.exports = {
  tableName: "data_source",
  
  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    description: {
      type: 'string'
    }
  }
}
