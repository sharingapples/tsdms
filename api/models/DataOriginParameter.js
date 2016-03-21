module.exports = {
  tableName: "data_origin_parameter",

  attributes: {
    dataOrigin: {
      columnName: "data_origin_id",
      model: "DataOrigin",
      required: true
    },
    code: {
      type: 'string',
      required: true
    },
    parameter: {
      columnName: "parameter_id",
      model: "Parameter",
      required: true
    },
    parameterUnit: {
      columnName: "parameter_unit_id",
      model: "ParameterUnit",
      required: true
    },
    isDiagnostic: {
      columnName: "is_diagnostic",
      type: "boolean"
    }
  }
}
