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
* @signature: 99d2bb717c94f465dff2a84e638e13df
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/ParameterType.js
*/
module.exports = {
  name: "ParameterType",
  hash: "e09300f00d3c8cf41ad6c718ebdf602f",
  attributes: [{
    name: "name",
    type: "string",
    
    label: "Name",
  }, {
    name: "parameterUnit",
    columnName: "parameter_unit_id",
    model: "ParameterUnit",
    type: "ParameterUnit",
    
    label: "Parameter Unit",
  }]
}
