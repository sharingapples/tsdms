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
* @signature: 10e0c6fff9f5ada7d71136f0cd6c7e74
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/Observation.js
*/
module.exports = {
  name: "Observation",
  hash: "293f5a139ffe00f5d16370c13fce37ac",
  attributes: [{
    name: "dataSeries",
    columnName: "data_series_id",
    model: "DataSeries",
    type: "DataSeries",
    
    label: "Data Series",
  }, {
    name: "time",
    type: "datetime",
    
    label: "Time",
  }, {
    name: "value",
    type: "float",
    
    label: "Value",
  }, {
    name: "stage",
    type: "integer",
    
    label: "Stage",
  }, {
    name: "quality",
    type: "integer",
    
    label: "Quality",
  }]
}
