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
* @signature: b04ec0db67f0580ee9178fa2552d3286
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/DaqParserParameter.js
*/
module.exports = {
  name: "DaqParserParameter",
  hash: "bf2738c9a6d9a0176b84430c0ab98db6",
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
