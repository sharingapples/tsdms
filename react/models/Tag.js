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
* @signature: 8ad0e48fe2b82a516c9f77f5f6f06c07
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/Tag.js
*/
module.exports = {
  name: "Tag",
  hash: "d54a0fc4f22145fcea1751a096e82060",
  attributes: [{
    name: "name",
    type: "string",
    
    label: "Name",
  }, {
    name: "description",
    type: "string",
    
    label: "Description",
  }, {
    name: "providesUniqueness",
    columnName: "provides_uniqueness",
    type: "boolean",
    
    label: "Provides Uniqueness",
  }, {
    name: "starred",
    type: "boolean",
    
    label: "Starred",
  }]
}
