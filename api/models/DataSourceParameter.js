module.exports = {
  attributes: {
    dataSource: {
      model: "DataSource",
      required: true
    },
    parameter: {
      model: "Parameter",
      required: true
    },
    code: {
      type: "string",
      required: true
    },
    parameterUnit: {
      model: "ParameterUnit",
      required: true
    }
  }
}
