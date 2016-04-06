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
* @signature: 0013c03f30477c1255a35126a6ac28c5
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/Parameter.js
*/
module.exports = {
  name: "Parameter",
  hash: "3866e4e4eca899a18515fe1e35b9e48a",
  attributes: [{
    name: "code",
    type: "string",
    
    label: "Code",
  }, {
    name: "name",
    type: "string",
    
    label: "Name",
  }, {
    name: "description",
    type: "string",
    
    label: "Description",
  }, {
    name: "parameterType",
    columnName: "parameter_type_id",
    model: "ParameterType",
    type: "ParameterType",
    
    label: "Parameter Type",
  }]
}
