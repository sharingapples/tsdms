module.exports = {
  tableName: "daq_processor_parameter",

  attributes: {
    daqProcessor: {
      model: "DaqProcessor",
      columnName: "daq_processor_id",
      required: true
    },
    parameter: {
      type: "string",
      required: true
    },
    value: {
      type: "string",
      required: true
    }
  }
}
