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
* @signature: f206080984e44aab980e388662cafd6e
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/DataSourceAttribute.js
*/
module.exports = {
  name: "DataSourceAttribute",
  hash: "c19f2de181b461aa8393c2e30e916f74",
  attributes: [{
    name: "dataSource",
    columnName: "data_source_id",
    model: "DataSource",
    type: "DataSource",
    
    label: "Data Source",
  }, {
    name: "name",
    type: "string",
    
    label: "Name",
  }, {
    name: "type",
    type: "string",
    
    label: "Type",
  }, {
    name: "required",
    type: "boolean",
    
    label: "Required",
  }, {
    name: "label",
    type: "string",
    
    label: "Label",
  }, {
    name: "description",
    type: "string",
    
    label: "Description",
  }, {
    name: "options",
    type: "string",
    
    label: "Options",
  }]
}
