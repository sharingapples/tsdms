module.exports = {
  attributes: {
    station: {
      model: "Station",
      required: true
    },
    dataOrigin: {
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
