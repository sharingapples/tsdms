module.exports = {
  attributes: {
    dataSource: {
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
    }
  }
}
