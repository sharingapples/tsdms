"use strict";

var fs = require('fs');
var path = require('path');

var modelPath = path.resolve(__dirname, '../api/models/');
var targetDir = path.resolve(__dirname, '../../wscada.net-ui/src/models/');

console.log("Model Path: ", modelPath);
// Read all the files in the api/model directory
fs.readdir(modelPath, function(err, files) {
  if (err) {
    console.error("Could not read directory - ", modelPath);
  }

  var now = new Date();
  files.forEach(function(file) {
    // Only process the js files
    if (file.endsWith('.js')) {
      var model = require(modelPath + '/' + file);
      var attributes = model.attributes;
      var content =`/**
 * Automatically generated model file
 * @time: ${now.toLocaleString()}
 * @source: ${"api/models/" + file}
 */
 module.exports = {
  attributes: {
    `;
      for(var attr in attributes) {
        // Only take attributes that are object and have a property named 'type'
        if(typeof(attributes[attr]) === 'object' && attributes[attr].hasOwnProperty('type')) {
          content += attr + ":" + JSON.stringify(attributes[attr]) + ",\n    ";
        }
      }
      content += "}\n}";

      fs.writeFile(targetDir + '/' + file, content, function(err) {
        if (err) {
          console.error("Error while generating model - ", file);
          console.error(err);
        }
      });


    }
  })
});
