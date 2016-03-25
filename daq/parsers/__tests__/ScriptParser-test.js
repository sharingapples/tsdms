"use strict";

jest.unmock('../ScriptParser');
const ScriptParser = require('../ScriptParser');
var simpleScript = `
  session.log(1, "9801", "T", new Date(2015, 10, 10), 2.1);
  session.log(2, "9802", "T", new Date(2015, 10, 10), -2.1);
  session.end();
`;

var complexScript = `
  var text = "";
  stream.on("data", (chunk) => {
    text += chunk;
  });
  stream.on("end", () => {
    var values = tex t.split(" ");
    for(var i=0; i<values.length; i+=2) {
      session.log(i/2+1, args.mobile, values[i], args.timestamp, parseFloat(values[i+1]));
    }
    session.end();
  });
`

describe("ScriptParser", () => {
  it("Check a sample script", (done) => {
    const session = {
      log: function(idx, origin, parameter, timestamp, value) {
        expect(parseInt(origin)).toEqual(9800 + idx);
        expect(parameter).toBe('T');
        expect(timestamp).toEqual(new Date(2015, 10, 10));
        expect(value).toEqual(idx == 1 ? 2.1 : -2.1);
        //console.log(idx, origin, parameter, timestamp, value);
      },
      end() {
        done();
      },
      error(msg) {
        throw msg;
      }
    }

    var parser = new ScriptParser({
      script: simpleScript
    });
    parser.parse(session, null, { });
  });

  it("Check a complex script", (done) => {
    const session = {
      log: function(idx, origin, parameter, timestamp, value) {
        //console.log(idx, origin, parameter, timestamp, value);
        expect(origin).toBe("1714mobile");
        expect(parameter).toBe(idx==1?"01":"02");
        expect(timestamp).toEqual(new Date(2015, 9, 1, 9, 0));
        expect(value).toBe(idx==1?21.3:22.1);
      },
      end() {
        done();
      },
      error(msg) {
        console.error(msg);
        throw msg;
      }
    }
    var parser = new ScriptParser({
      script: complexScript
    });
    const input = "01 21.3 02 22.1";
    const Readable = require('stream').Readable;
    const s = new Readable();
    s.push(input);
    s.push(null);

    parser.parse(session, s, { mobile: "1714mobile", timestamp: new Date(2015,9,1,9,0)});
  })
});
