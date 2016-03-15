module.exports = {
  tableName: "raw_data",

  attributes: {
    request: {
      model: "Request",
      required: true
    },
    originCode: {
      type: "string",
      required: true
    },
    parameterCode: {
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
