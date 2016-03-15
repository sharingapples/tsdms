module.exports = {
  tableName: "data_source_parameter",

  attributes: {
    dataSource: {
      columnName: "data_source_id",
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
      columnName: "parameter_unit_id",
      model: "ParameterUnit",
      required: true
    }
  }
}
