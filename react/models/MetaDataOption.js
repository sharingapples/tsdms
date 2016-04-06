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
* @signature: 3aa8226af0698d39435138c203d33d59
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/MetaDataOption.js
*/
module.exports = {
  name: "MetaDataOption",
  hash: "a73fbdf18de667651cf55eebf5dc4815",
  attributes: [{
    name: "metaData",
    columnName: "meta_data_id",
    model: "MetaData",
    type: "MetaData",
    
    label: "Meta Data",
  }, {
    name: "value",
    type: "string",
    
    label: "Value",
  }, {
    name: "text",
    type: "string",
    
    label: "Text",
  }, {
    name: "seq",
    type: "integer",
    
    label: "Seq",
  }]
}
