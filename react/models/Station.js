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
* @signature: 7f9296ee763d17aba6bbacd4adc37de5
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/Station.js
*/
module.exports = {
  name: "Station",
  hash: "0ae01fe4c55cc597b6ee140070cffd1b",
  attributes: [{
    name: "identifier",
    type: "string",
    
    label: "Identifier",
  }, {
    name: "name",
    type: "string",
    
    label: "Name",
  }, {
    name: "latitude",
    type: "float",
    
    label: "Latitude",
  }, {
    name: "longitude",
    type: "float",
    
    label: "Longitude",
  }, {
    name: "elevation",
    type: "float",
    
    label: "Elevation",
  }, {
    name: "description",
    type: "string",
    
    label: "Description",
  }, {
    name: "established",
    type: "date",
    
    label: "Established",
  }]
}
