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
* @signature: 7f35cca750cebd04ed6a00bc8892597b
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/RawData.js
*/
module.exports = {
  name: "RawData",
  hash: "7caff589ac2319ea5f88f17682acbc01",
  attributes: [{
    name: "request",
    columnaNmae: "request_id",
    model: "Request",
    type: "Request",
    
    label: "Request",
  }, {
    name: "dataOriginParameter",
    columnName: "data_origin_parameter_id",
    model: "DataOriginParameter",
    type: "DataOriginParameter",
    
    label: "Data Origin Parameter",
  }, {
    name: "originCode",
    columnName: "origin_code",
    type: "string",
    
    label: "Origin Code",
  }, {
    name: "parameterCode",
    columnName: "parameter_code",
    type: "string",
    
    label: "Parameter Code",
  }, {
    name: "time",
    type: "datetime",
    
    label: "Time",
  }, {
    name: "value",
    type: "float",
    
    label: "Value",
  }, {
    name: "flag",
    type: "integer",
    
    label: "Flag",
  }]
}
