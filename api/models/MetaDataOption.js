module.exports = {
  tableName: "meta_data_options",

  attributes: {
    metaData: {
      columnName: "meta_data_id",
      model: 'MetaData',
    },
    value: {
      type: 'string',
      required: true
    },
    text: {
      type: 'string',
      required: true
    },
    seq: {
      type: 'integer'
    }
  }
}
