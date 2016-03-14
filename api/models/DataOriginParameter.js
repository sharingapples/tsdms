module.exports = {
  attributes: {
    dataOrigin: {
      model: "DataOrigin",
      required: true
    },
    code: {
      type: 'string',
      required: true
    },
    parameter: {
      model: "Parameter",
      required: true
    },
    parameterUnit: {
      model: "ParameterUnit",
      required: true
    },
    isDiagnostic: {
      type: "boolean"
    }
  }
}
