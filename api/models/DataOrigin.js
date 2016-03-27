module.exports = {
  tableName: "data_origin",

  attributes: {
    dataSource: {
      columnName: "data_source_id",
      model: "DataSource",
      required: true
    },
    code: {
      type: "string",
      required: true
    },
    timezone: {
      type: "string"
    },
    options: {
      type: "string"
    }
  }
}
