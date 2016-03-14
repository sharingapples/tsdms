module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    parameterUnit: {
      model: 'ParameterUnit',
      required: true
    }
  }
}
