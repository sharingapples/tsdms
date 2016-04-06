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
* @signature: 5cb8de25019dcbb656c213b7f92cf8c3
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/TagStation.js
*/
module.exports = {
  name: "TagStation",
  hash: "de2e32b9619bcbe9c2c4c6d5302b1c3e",
  attributes: [{
    name: "tag",
    columnName: "tag_id",
    model: "Tag",
    type: "Tag",
    
    label: "Tag",
  }, {
    name: "station",
    columnName: "station_id",
    model: "Station",
    type: "Station",
    
    label: "Station",
  }, {
    name: "uniqueId",
    type: "string",
    
    label: "Unique Id",
  }]
}
