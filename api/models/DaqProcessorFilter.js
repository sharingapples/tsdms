module.exports = {
  tableName: "daq_processor_filter",

  attributes: {
    daqProcessor: {
      model: "DaqProcessor",
      columnName: "daq_processor_id",
      required: true
    },
    filter: {
      type: "string",
      required: true
    },
    value: {
      type: "string",
      required: true
    }
  }
}
