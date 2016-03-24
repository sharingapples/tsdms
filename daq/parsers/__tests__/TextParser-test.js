"use strict";

jest.unmock('../TextParser');
jest.unmock('mustache');
jest.unmock('moment');


var TextParser = require('../TextParser');

describe('TextParser', () => {
  it('check Text parser without header', (done) => {
    const parser = new TextParser({
      header: "",
      body: "(\\d+)\\s+([-+]{0,1}[0-9\\.]+)",
      nanValue: "999",
      origins: "{{mobile}}",
      parameters: "{{body.1}}",
      datetimes: "{{timestamp}}",
      formats: "",
      values: "{{body.2}}"
    });
    const Readable = require('stream').Readable;
    const s = new Readable();
    const input = "01 21.3 02 -22.5 03 +2 04 .91 05 999 06 0999";
    const inputs = input.split(' ');
    const values = inputs.filter( (inp, idx) => idx%2==1).map((inp) => (inp === "999" ? null : parseFloat(inp)));
    s.push(input);
    s.push(null);

    parser.parse({
      log: function(idx, origin, parameter, timestamp, value) {
        expect(origin).toBe("1714mobile");
        expect(parameter).toBe(inputs[(idx-1)*2]);
        expect(timestamp).toEqual(new Date(2015, 9, 12, 9, 30, 44));
        expect(value).toEqual(values[idx-1]);
        //console.log(idx, origin, parameter, timestamp, value);
      },
      end: function() {
        done();
      }
    }, s, { mobile: "1714mobile", timestamp: "2015-10-12 09:30:44"});
  });

  it('check Text Parser with header', (done) => {
    const parser = new TextParser({
      header: "(\\d{2})(\\d{2})",
      body: "(\\d+)\\s+([-+]{0,1}[0-9\\.]+)",
      nanValue: "999",
      origins: "{{mobile}}",
      parameters: "{{body.1}}",
      datetimes: "{{date}} {{header.1}}:{{header.2}}",
      formats: "",
      values: "{{body.2}}"
    });

    const Readable = require('stream').Readable;
    const s = new Readable();
    const input = "0900 01 21.3 02 -22.5 03 +2 04 .91 05 999 06 0999";
    const inputs = input.split(' ');
    const values = inputs.filter( (inp, idx) => idx>0 && idx%2==0).map((inp) => (inp === "999" ? null : parseFloat(inp)));

    s.push(input);
    s.push(null);

    parser.parse({
      log: function(idx, origin, parameter, timestamp, value) {
        expect(origin).toBe("1714mobile");
        expect(parameter).toBe(inputs[(idx-1)*2+1]);
        expect(timestamp).toEqual(new Date(2015, 9, 12, 9, 0, 0));
        expect(value).toEqual(values[idx-1]);
        //console.log(idx, origin, parameter, timestamp, value);
      },
      end: function() {
        done();
      }
    }, s, { mobile: "1714mobile", date: "2015-10-12"});

  })
});
