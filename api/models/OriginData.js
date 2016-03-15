module.exports = {
  tableName: "origin_data",

  attributes: {
    rawData: {
      columnName: "raw_data_id",
      model: "RawData",
      required: true
    },
    dataOriginParameter: {
      columnName: "data_origin_parameter_id",
      model: "DataOriginParameter",
      required: true
    },
    flag: {
      type: "integer",
      required: true
    }
  }
}
