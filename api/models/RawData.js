module.exports = {
  tableName: "raw_data",

  attributes: {
    request: {
      columnaNmae: "request_id",
      model: "Request",
      required: true
    },
    dataOriginParameter: {
      columnName: "data_origin_parameter_id",
      model: "DataOriginParameter",
      required: true
    },
    originCode: {
      columnName: "origin_code",
      type: "string",
      required: true
    },
    parameterCode: {
      columnName: "parameter_code",
      type: "string",
      required: true
    },
    time: {
      type: "datetime",
      required: true
    },
    value: {
      type: 'float'
    },
    flag: {
      type: "integer",
      required: true
    }
  }
}
