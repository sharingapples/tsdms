module.exports = {
  attributes: {
    daqProcessor: {
      model: "DaqProcessor",
      required: true
    },
    payload: {
      type: "string",
      required: true,
    },
    payloadIsFile: {
      type: "boolean",
      required: true
    }
  }
}
