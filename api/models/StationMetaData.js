module.exports = {
  tableName: "station_meta_data",

  attributes: {
    station: {
      model: 'Station'
    },
    metaData: {
      columnName: "meta_data_id",
      model: 'MetaData'
    },
    value: {
      type: 'text',
      required: true
    }
  }
}
