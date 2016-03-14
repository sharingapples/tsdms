module.exports = {
  attributes: {
    rawData: {
      model: "RawData",
      required: true
    },
    dataOriginParameter: {
      model: "DataOriginParameter",
      required: true
    },
    flag: {
      type: "integer",
      required: true
    }
  }
}
