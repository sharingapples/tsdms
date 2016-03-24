"use strict";

class ScriptParser {
  constructor(options) {
    // eval the script, where we expect it to
    this.userScript = new Function("session", "stream", "args", options.script);
  }

  parse(session, stream, args) {
    this.userScript.call(session, stream, args);
  }
}

module.exports = ScriptParser;
//
//     defaultValue: `
// function(cb, args, dataSource, buffer) {
//   // Get the data from the arguments. The raw data is available as javascript buffer.
//   var origin = args["origin"];
//   var parameter = args["parameter"];
//
//   callback.record();
//
//   callback.stat("12345");
// }
// `
//   }
// }
