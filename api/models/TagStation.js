module.exports = {
  tableName: "tag_station",

  attributes: {
    tag: {
      columnName: "tag_id",
      model: 'Tag'
    },
    station: {
      columnName: "station_id",
      model: 'Station'
    },
    uniqueId: {
      type: 'string'
    }
  }
}
