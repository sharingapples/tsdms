module.exports = {
  attributes: {
    station: {
      model: "Station",
      required: true
    },
    type: {
      type: "string",
      enum: ["Primary", "Aggregated", "Derived"],
      required: true
    },
    name: {
      type: "string",
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
    interval: {
      type: "integer",
      required: true
    },
    startTime: {
      type: "datetime",
      required: true
    },
    tolerance: {
      type: "integer",
      required: true
    }
  }
}
