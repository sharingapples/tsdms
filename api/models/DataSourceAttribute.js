module.exports = {
  tableName: "data_source_attribute",

  attributes: {
    dataSource: {
      columnName: "data_source_id",
      model: "DataSource",
      required: true
    },
    name: {
      type: "string",
      required: true
    },
    type: {
      type: "string",
      required: true
    },
    required: {
      type: "boolean",
      required: true
    },
    label: {
      type: "string",
      required: true
    },
    description:{
      type: "string"
    },
    options: {
      type: "string"
    }
  }
}
