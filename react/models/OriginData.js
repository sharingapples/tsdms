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
* @time : 3/20/2016, 5:26:50 PM
* @signature: a78871529cbeab654f1f667e928de097
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/OriginData.js
*/
module.exports = {
  name: "OriginData",
  hash: "79fce9daecf71c12aacd6931a786948d",
  attributes: [{
    name: "rawData",
    columnName: "raw_data_id",
    model: "RawData",
    type: "RawData",
    
    label: "Raw Data",
  }, {
    name: "dataOriginParameter",
    columnName: "data_origin_parameter_id",
    model: "DataOriginParameter",
    type: "DataOriginParameter",
    
    label: "Data Origin Parameter",
  }, {
    name: "flag",
    type: "integer",
    
    label: "Flag",
  }]
}
