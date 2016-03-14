module.exports = {
  attributes: {
    dataSource: {
      model: "DataSource",
      required: true
    },
    code: {
      type: "string",
      required: true
    },
    timezone: {
      type: "string"
    }
  }
}
