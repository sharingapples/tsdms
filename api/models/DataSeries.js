module.exports = {
  tableName: "data_series",

  attributes: {
    station: {
      columnName: "station_id",
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
      columnName: "parameter_id",
      model: "Parameter",
      required: true
    },
    parameterUnit: {
      columnName: "parameter_unit_id",
      model: "ParameterUnit",
      required: true
    },
    interval: {
      type: "integer",
      required: true
    },
    startTime: {
      columnName: "start_time",
      type: "datetime",
      required: true
    },
    tolerance: {
      type: "integer",
      required: true
    }
  }
}
