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
* @signature: 43d04fb54a93aa2a6f4251d2993420ce
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/StationResource.js
*/
module.exports = {
  name: "StationResource",
  hash: "4f664ff547a57f206c38a033ac121ae3",
  attributes: [{
    name: "station",
    columnName: "station_id",
    model: "Station",
    type: "Station",
    
    label: "Station",
  }, {
    name: "resource",
    columnName: "resource_id",
    model: "Resource",
    type: "Resource",
    
    label: "Resource",
  }]
}
