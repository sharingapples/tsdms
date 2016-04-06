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
* @signature: 209342b74e05a97b81c3d945dd2a3dd5
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/DataSeries.js
*/
module.exports = {
  name: "DataSeries",
  hash: "cb69f88eed54a6f9fca077510be94d61",
  attributes: [{
    name: "station",
    columnName: "station_id",
    model: "Station",
    type: "Station",
    
    label: "Station",
  }, {
    name: "type",
    type: "string",
    
    label: "Type",
  }, {
    name: "name",
    type: "string",
    
    label: "Name",
  }, {
    name: "parameter",
    columnName: "parameter_id",
    model: "Parameter",
    type: "Parameter",
    
    label: "Parameter",
  }, {
    name: "parameterUnit",
    columnName: "parameter_unit_id",
    model: "ParameterUnit",
    type: "ParameterUnit",
    
    label: "Parameter Unit",
  }, {
    name: "interval",
    type: "integer",
    
    label: "Interval",
  }, {
    name: "startTime",
    columnName: "start_time",
    type: "datetime",
    
    label: "Start Time",
  }, {
    name: "tolerance",
    type: "integer",
    
    label: "Tolerance",
  }]
}
