/**
* Automatially generated Model file for client side (React UI).
*
* You can modifiy the attributes to contain UI specific attributes
* like label, description, suffix, prefix, etc.
*
* However, once you edit this file, this model will not be generated
* automatically and you will have to manually synchronize this file
* with the sails Model.
*
* @time : 4/3/2016, 9:07:37 PM
* @signature: 7f900d58df57b1677939b7fcd98de49e
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/DataOriginParameter.js
*/
module.exports = {
  name: "DataOriginParameter",
  hash: "ab51370073db9cd53246061446ffa9b3",
  attributes: [{
    name: "dataOrigin",
    columnName: "data_origin_id",
    model: "DataOrigin",
    type: "DataOrigin",
    
    label: "Data Origin",
  }, {
    name: "code",
    type: "string",
    
    label: "Code",
  }, {
    name: "parameter",
    columnName: "parameter_id",
    model: "Parameter",
    type: "Parameter",
    
    label: "Parameter",
  }, {
    name: "parameterUnit",
    columnName: "parameter_unit_id",
    model: "ParameterUnit",
    type: "ParameterUnit",
    
    label: "Parameter Unit",
  }, {
    name: "isDiagnostic",
    columnName: "is_diagnostic",
    type: "boolean",
    
    label: "Is Diagnostic",
  }]
}
