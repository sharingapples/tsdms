module.exports = {
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
      model: "ParameterType",
      required: true
    }
  }
}
