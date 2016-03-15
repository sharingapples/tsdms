module.exports = {
  tableName: "request",

  attributes: {
    daqProcessor: {
      columnName: "daq_processor_id",
      model: "DaqProcessor",
      required: true
    },
    payload: {
      type: "string",
      required: true,
    },
    payloadIsFile: {
      columnName: "payload_is_file",
      type: "boolean",
      required: true
    }
  }
}
