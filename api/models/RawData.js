module.exports = {
  tableName: "raw_data",

  attributes: {
    request: {
      model: "Request",
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
