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
* @signature: e88e91aa7f4bf8b2b12d9390e3066942
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/MetaData.js
*/
module.exports = {
  name: "MetaData",
  hash: "fc4aec1f5c564794c25241c9e183e958",
  attributes: [{
    name: "name",
    type: "string",
    
    label: "Name",
  }, {
    name: "caption",
    type: "string",
    
    label: "Caption",
  }, {
    name: "description",
    type: "string",
    
    label: "Description",
  }, {
    name: "validationRegex",
    columnName: "validation_regex",
    type: "string",
    
    label: "Validation Regex",
  }, {
    name: "seq",
    type: "integer",
    
    label: "Seq",
  }, {
    name: "important",
    type: "boolean",
    
    label: "Important",
  }]
}
