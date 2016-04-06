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
* @signature: 86061a4382e8d75e509dc8a93c8b1dea
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/DaqProcessor.js
*/
module.exports = {
  name: "DaqProcessor",
  hash: "94b2f71a883e8f138681b7a90dc4c4af",
  attributes: [{
    name: "dataSource",
    columnName: "data_source_id",
    model: "DataSource",
    type: "DataSource",
    
    label: "Data Source",
  }, {
    name: "protocol",
    type: "string",
    
    label: "Protocol",
  }, {
    name: "parser",
    type: "string",
    
    label: "Parser",
  }, {
    name: "protocol_filter",
    type: "string",
    
    label: "Protocol Filter",
  }, {
    name: "parser_filter",
    type: "string",
    
    label: "Parser Filter",
  }]
}
