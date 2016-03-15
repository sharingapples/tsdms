module.exports = {
  tableName: "parameter_unit",
  
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    symbol: {
      type: 'string',
      required: true,
      unique: true
    }
  }
}
