module.exports = {
  tableName: "station_resource",

  attributes: {
    station: {
      columnName: "station_id",
      model: 'Station'
    },
    resource: {
      columnName: "resource_id",
      model: 'Resource'
    }
  }
}
