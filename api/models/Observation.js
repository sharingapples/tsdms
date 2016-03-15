module.exports = {
  tableName: "observation",

  attributes: {
    dataSeries: {
      columnName: "data_series_id",
      model: "DataSeries",
      required: true,
    },
    time: {
      type: "datetime",
      required: true
    },
    value: {
      type: "float"
    },
    stage: {
      type: "integer",
      required: true
    },
    quality: {
      type: "integer",
      required: true
    }
  }
}
