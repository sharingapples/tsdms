"use strict";

const md5 = require('md5');
const fs = require('fs');
const path = require('path');

const modelPath = path.resolve(__dirname, '../api/models/');
const targetDir = path.resolve(__dirname, '../../wscada.net-ui/src/js/models/');

const options = {};
process.argv.forEach( (val, index) => {
  if (val == '--force' || val == '-f') {
    options.forced = true;
  }
});

// Read all the files in the api/model directory
fs.readdir(modelPath, function(err, files) {
  if (err) {
    console.error("Could not read directory - ", modelPath);
    return;
  }

  const now = new Date();
  files.filter(file => file.endsWith('.js')).forEach(file => {
    const name = file.substr(0, file.length-3);
    const srcFile = modelPath + '/' + file;
    const targetFile = targetDir + '/' + file;
    Promise.all([
      generateSourceHash(srcFile).then(function(hash) {
        // Get the src model
        const model = require(srcFile);
        let generateFlag = true;
        // Let's see if the target exists
        if (fs.existsSync(targetFile)) {
          const targetModel = require(targetFile);
          if (!options.forced && targetModel.__hash__ === hash) {
            return "No change";
          }

          // Check if the target file has been manually changed, in which case
          // don't automatically override it
          return checkIfModified(targetFile).then(function(modified) {
            //console.log("Modified ", modified);
            if (modified) {
              throw "Model definition modified manually. Auto generation will not override.";
            }

            return { hash, model };
          });
        } else {
          return { hash, model };
        }
      }).then(function(value) {
        if (typeof value === "object") {
          return generateOutput(srcFile, targetFile, value.model, file.substr(0, file.length-3), value.hash);
        } else {
          return value;
        }
      })
    ]).then(function(msg) {
      console.log("✓ " + file + " :: " + msg);
    }, function(err) {
      console.error("✗ " + file + " :: ", err);
      if (typeof err !== 'string') {
        console.log(err.stack.split("\n"));
      }
    });
  });
});

function generateOutput(src, target, model, name, hash) {
  return new Promise(function(resolve, reject) {
    let content = `module.exports = {\n  name: ${JSON.stringify(name)},\n  hash: ${JSON.stringify(hash)},\n  attributes: [`;
    let first = true;
    for(let attr in model.attributes) {
      if (first) {
        first = false;
      } else {
        content += ", "
      }
      const attribute = model.attributes[attr];
      // the attribute definition might consist of functions (sails call them rules)
      // as well, so will avoid that. Only take the property that are text.
      content += `{\n    name: ${JSON.stringify(attr)}`
      for(let prop in attribute) {
        const value = attribute[prop];
        if (typeof value === "string") {
          content += `,\n    ${prop}: ${JSON.stringify(value)}`;
        }
      }
      content += ",\n    ";
      /* Let's also generate few UI specific attributes like caption */
      const caption = toTitleCase(attr);
      content += `\n    __caption: ${JSON.stringify(caption)},`;
      content += "\n  }"
    }
    content += "]\n}\n";
    const signature = md5(content);
    content = `/**
* Automatially generated Model file for client side (React UI).
*
* You can modifiy the attributes to contain UI specific attributes
* like __caption, __description, __suffix, __prefix, __regex, etc.
* However, once you edit this file, this model will not be generated
* automatically and you will have to manually synchronize this file
* with the sails Model.
*
* @time : ${new Date().toLocaleString()}
* @signature: ${signature}
* @source: ${src}
*/
${content}`;
    fs.writeFile(target, content, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve("New file Generated");
      }
    });
  })
}
function toTitleCase(src) {
  let res = "";
  let capitalize = true;
  for(let i=0; i<src.length; ++i) {
    if (capitalize) {
      res += src[i].toUpperCase();
      capitalize = false;
    } else if (src[i] == '_') {
      res += " ";
      capitalize = true;
    } else if (src[i] >= 'A' && src[i] <= 'Z') {
      res += " " + src[i];
    } else {
      res += src[i];
    }
  }
  return res;
}
function checkIfModified(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, "utf-8", function(err, res) {
      if (err) reject(err);
      else {
        const matches = res.match(/@signature: ([0-9abcdef]{32})/i);
        if (!matches) {
          // No signature found, consider the file has been modified
          return resolve(true);
        }
        const signature = matches[1];
        const pos = res.search(/module\.exports = \{/);
        if ( pos === -1) {
          // Looks like the the file has been modified using ES6 syntax
          // otherwise
          return resolve(true);
        }

        //console.log("Sig = ", signature);
        //console.log("MD5 = ", md5(res.substr(pos, res.length)));
        // finally check if the signature is same or not
        return resolve(signature !== md5(res.substr(pos, res.length)));
      }
    })
  })
}
function generateSourceHash(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, null, function(err, res) {
      if (err) reject(err);
      else resolve(md5(res));
    });
  });
}

function checkExists(file) {
  return new Promise(function(resolve, reject) {
    fs.exists(file, function(exists) {

      console.log("Check Exists", err, res);
      if (err) reject(err);
      else resolve(res);
    })
  })
}

//       generateSourceHash(srcFile).then(function(hash) {
//
//       });
//       var hash = md5(fs.readFileSync(modelPath + '/' + file));
//       var fileModified = false;
//       // See if the targetFile exists
//       var signature;
//       if (fs.existsSync(targetFile)) {
//         // If nothing has changed, no need to generate a target file
//         var targetModel = require(targetFile);
//         if (targetModel.__hash__ === hash) {
//           // The file has not changed, no need to generate target output
//           console.log("✓ " + file + " :: No changes");
//           return;
//         }
//
//         // Let's see if the user has manually changed the target file
//         var data = fs.readFileSync(targetFile, "utf-8");
//         var matches = data.match(/@signature: ([0-9abcdef]{32})/i);
//         if (matches) {
//           signature = matches[1];
//         }
//         var offset = data.search(/module\.exports = \{/);
//         if (offset == -1 || md5(data.substring(offset, data.length)) != signature) {
//           console.error("✗ " + file + " :: Manually modified. Please update this file manually.");
//           return;
//         }
//       }
//
//       var attributes = model.attributes;
//       var content = `module.exports = {
//    __name__: ${JSON.stringify(name)},
//    __hash__: ${JSON.stringify(hash)},
//    attributes: [
//     `;
//       for(var attr in attributes) {
//         // Only take attributes that are object and have a property named 'type'
//         if(typeof(attributes[attr]) === 'object' && attributes[attr].hasOwnProperty('type')) {
//           var obj = attributes[attr];
//           obj.__name__ = attr;
//           content += JSON.stringify(attributes[attr], null, 2) + ",\n    ";
//         }
//       }
//       content += "]\n}\n";
//
//       // Generate the signature for the content
//       signature = md5(content);
//       var header =`/**
//  * Automatically generated model file
//  * @time: ${now.toLocaleString()}
//  * @source: ${"api/models/" + file}
//  * @signature: ${signature}
//  */`;
//
//       fs.writeFile(targetFile, header + "\n" + content, function(err) {
//         if (err) {
//           console.error("✗ " + file + " :: File System Error. Could not write.");
//           console.error(err);
//         } else {
//           console.log("✓ " + file + " :: New file generated");
//         }
//       });
//
//
//     }
//   })
// });
