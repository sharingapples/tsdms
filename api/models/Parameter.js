module.exports = {
  tableName: "parameter",

  attributes: {
    code: {
      type: "string",
      required: true,
      unique: true
    },
    name: {
      type: "string",
      required: true
    },
    description: {
      type: "string"
    },
    parameterType: {
      columnName: "parameter_type_id",
      model: "ParameterType",
      required: true
    }
  }
}
