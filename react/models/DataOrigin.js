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
* @signature: d5664c7e9e7081893dd25ea708402573
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/DataOrigin.js
*/
module.exports = {
  name: "DataOrigin",
  hash: "5a836a90bb5ba7221e2db8a4cdb163c8",
  attributes: [{
    name: "dataSource",
    columnName: "data_source_id",
    model: "DataSource",
    type: "DataSource",
    
    label: "Data Source",
  }, {
    name: "code",
    type: "string",
    
    label: "Code",
  }, {
    name: "timezone",
    type: "string",
    
    label: "Timezone",
  }, {
    name: "options",
    type: "string",
    
    label: "Options",
  }]
}
