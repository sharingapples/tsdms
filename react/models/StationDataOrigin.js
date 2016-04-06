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
* @signature: de2ce7743725c9eea077e4b3e40294ed
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/StationDataOrigin.js
*/
module.exports = {
  name: "StationDataOrigin",
  hash: "7690cc6a238a99115284b8c98f64746e",
  attributes: [{
    name: "station",
    columnName: "station_id",
    model: "Station",
    type: "Station",
    
    label: "Station",
  }, {
    name: "dataOrigin",
    columnName: "data_origin_id",
    model: "DataOrigin",
    type: "DataOrigin",
    
    label: "Data Origin",
  }, {
    name: "installed",
    type: "datetime",
    
    label: "Installed",
  }, {
    name: "removed",
    type: "datetime",
    
    label: "Removed",
  }]
}
