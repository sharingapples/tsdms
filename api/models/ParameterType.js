module.exports = {
  tableName: "parameter_type",

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    parameterUnit: {
      columnName: "parameter_unit_id",
      model: 'ParameterUnit',
      required: true
    }
  }
}
