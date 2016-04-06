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
* @signature: 5bf116c05c620a53df70db9dce9c727d
* @source: /Users/ranjan/Workspace/wscada.net/wscada.net-server/api/models/Request.js
*/
module.exports = {
  name: "Request",
  hash: "1929c79d7171a785485d27df49971e0d",
  attributes: [{
    name: "daqProcessor",
    columnName: "daq_processor_id",
    model: "DaqProcessor",
    type: "DaqProcessor",
    
    label: "Daq Processor",
  }, {
    name: "payload",
    type: "string",
    
    label: "Payload",
  }, {
    name: "payloadIsFile",
    columnName: "payload_is_file",
    type: "boolean",
    
    label: "Payload Is File",
  }]
}
