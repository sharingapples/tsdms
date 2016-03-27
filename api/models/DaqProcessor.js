module.exports = {
  tableName: "daq_processor",

  attributes: {
    dataSource: {
      columnName: "data_source_id",
      model: "DataSource",
      required: true
    },
    protocol: {
      type: "string",
      required: true
    },
    parser: {
      type: "string",
      required: true
    },
    protocol_filter: {
      type: "string",
      required: true
    },
    parser_filter: {
      type: "string",
      required: true
    }
  }
}
