module.exports = {
  tableName: "station_data_origin",

  attributes: {
    station: {
      columnName: "station_id",
      model: "Station",
      required: true
    },
    dataOrigin: {
      columnName: "data_origin_id",
      model: "DataOrigin",
      required: true
    },
    installed: {
      type: "datetime",
      required: true
    },
    removed: {
      type: "datetime"
    }
  }
}
