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
* @signature: d9c0a51e0786b551d3af8065a6dd9a04
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/StationMetaData.js
*/
module.exports = {
  name: "StationMetaData",
  hash: "8c79e8bf3f6b004f28c9fd4189d9b17b",
  attributes: [{
    name: "station",
    model: "Station",
    type: "Station",
    
    label: "Station",
  }, {
    name: "metaData",
    columnName: "meta_data_id",
    model: "MetaData",
    type: "MetaData",
    
    label: "Meta Data",
  }, {
    name: "value",
    type: "text",
    
    label: "Value",
  }]
}
