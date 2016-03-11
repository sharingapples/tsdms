"use strict";
var md5 = require('md5');
var fs = require('fs');
var path = require('path');

var modelPath = path.resolve(__dirname, '../api/models/');
var targetDir = path.resolve(__dirname, '../../wscada.net-ui/src/js/models/');

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
      var name = file.substr(0, file.length-3);
      var srcFile = modelPath + '/' + file;
      var targetFile = targetDir + '/' + file;

      var model = require(srcFile);
      var hash = md5(fs.readFileSync(modelPath + '/' + file));
      var fileModified = false;
      // See if the targetFile exists
      var signature;
      if (fs.existsSync(targetFile)) {
        // If nothing has changed, no need to generate a target file
        var targetModel = require(targetFile);
        if (targetModel.__hash__ === hash) {
          // The file has not changed, no need to generate target output
          console.log("✓ " + file + " :: No changes");
          return;
        }

        // Let's see if the user has manually changed the target file
        var data = fs.readFileSync(targetFile, "utf-8");
        var matches = data.match(/@signature: ([0-9abcdef]{32})/i);
        if (matches) {
          signature = matches[1];
        }
        var offset = data.search(/module\.exports = \{/);
        if (offset == -1 || md5(data.substring(offset, data.length)) != signature) {
          console.error("✗ " + file + " :: Manually modified. Please update this file manually.");
          return;
        }
      }

      var attributes = model.attributes;
      var content = `module.exports = {
   __name__: ${JSON.stringify(name)},
   __hash__: ${JSON.stringify(hash)},
   attributes: [
    `;
      for(var attr in attributes) {
        // Only take attributes that are object and have a property named 'type'
        if(typeof(attributes[attr]) === 'object' && attributes[attr].hasOwnProperty('type')) {
          var obj = attributes[attr];
          obj.__name__ = attr;
          content += JSON.stringify(attributes[attr]) + ",\n    ";
        }
      }
      content += "]\n}\n";

      // Generate the signature for the content
      signature = md5(content);
      var header =`/**
 * Automatically generated model file
 * @time: ${now.toLocaleString()}
 * @source: ${"api/models/" + file}
 * @signature: ${signature}
 */`;

      fs.writeFile(targetFile, header + "\n" + content, function(err) {
        if (err) {
          console.error("✗ " + file + " :: File System Error. Could not write.");
          console.error(err);
        } else {
          console.log("✓ " + file + " :: New file generated");
        }
      });


    }
  })
});
