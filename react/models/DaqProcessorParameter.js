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
* @time : 3/21/2016, 5:48:20 PM
* @signature: 49d26dd0c41d149d91892a1ff3d1bd0f
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/DaqProcessorParameter.js
*/
module.exports = {
  name: "DaqProcessorParameter",
  hash: "9d63f70632e1590884cb172e35fc8e0c",
  attributes: [{
    name: "daqProcessor",
    model: "DaqProcessor",
    columnName: "daq_processor_id",
    type: "DaqProcessor",
    
    label: "Daq Processor",
  }, {
    name: "parameter",
    type: "string",
    
    label: "Parameter",
  }, {
    name: "value",
    type: "string",
    
    label: "Value",
  }]
}
