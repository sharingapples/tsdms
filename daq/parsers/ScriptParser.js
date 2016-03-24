"use strict";

function generateScript(err) {
  return (
`session.error("There was an error in the script ");`);
}

class ScriptParser {
  constructor(options) {
    // eval the script, where we expect it to
    try {
      this.userScript = new Function("session", "stream", "args", options.script);
    } catch(err) {
      this.userScript = new Function("session", "stream", "args", generateScript(err));
    }
  }

  parse(session, stream, args) {
    try {
      this.userScript.call(null, session, stream, args);
    } catch(err) {
      session.error("An error running script " + err);
    }
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
