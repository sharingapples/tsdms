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
* @signature: ebdfabefb9fc85be7e608bb5861bca46
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/DaqProcessorFilter.js
*/
module.exports = {
  name: "DaqProcessorFilter",
  hash: "761648c94385dfdc415b7b6572179dcf",
  attributes: [{
    name: "daqProcessor",
    model: "DaqProcessor",
    columnName: "daq_processor_id",
    type: "DaqProcessor",
    
    label: "Daq Processor",
  }, {
    name: "filter",
    type: "string",
    
    label: "Filter",
  }, {
    name: "value",
    type: "string",
    
    label: "Value",
  }]
}
