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
* @signature: d3c071167cfe1650cf5884656b7fd315
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/DataSourceParameter.js
*/
module.exports = {
  name: "DataSourceParameter",
  hash: "bc09c5a7e96c6a55281bb5f382de5bdb",
  attributes: [{
    name: "dataSource",
    columnName: "data_source_id",
    model: "DataSource",
    type: "DataSource",
    
    label: "Data Source",
  }, {
    name: "parameter",
    columnName: "parameter_id",
    model: "Parameter",
    type: "Parameter",
    
    label: "Parameter",
  }, {
    name: "code",
    type: "string",
    
    label: "Code",
  }, {
    name: "parameterUnit",
    columnName: "parameter_unit_id",
    model: "ParameterUnit",
    type: "ParameterUnit",
    
    label: "Parameter Unit",
  }]
}
