"use strict";

jest.unmock('../CSVParser');
jest.unmock('fs');
jest.unmock('path');
jest.unmock('mustache');
jest.unmock('moment');

var CSVParser = require('../CSVParser');
var fs = require('fs');
var path = require('path');

describe('CSVParser', () => {
  // Check CSV with the following information
  // Path: 8019/RF.csv -> /^(?<origin>\d+)/(?<parameter>\w+).csv$/
  // Date, Time, Value
  // 2015-10-12, 12:30, 0
  // 2015-10-12, 13:30, 0
  it('check CSV Parser with standard values', (done) => {
    const parser = new CSVParser({
      separator: ",",
      delimiter: "\n",
      headerRow: 0,
      skipRows: 1,
      nanValue: "999",

      origins: "{{origin}}",
      parameters: "{{parameter}}",
      datetimes: "{{csv.0}} {{csv.1}}",
      formats: "YYYY-MM-DD HH:mm",
      values: "{{csv.2}}"
    });
    const expectedValues = [
      null, 0, 0.2, null
    ];
    const stream = fs.createReadStream(path.resolve(__dirname, 'sample-01.csv'), { encoding: "utf8"});
    parser.parse({
      log: function(idx, origin, parameter, timestamp, value) {
        expect(origin).toBe("8019");
        expect(parameter).toBe("RF");
        expect(timestamp.getYear()+1900).toBe(2015);
        expect(value).toBe(expectedValues[idx]);
      },
      end: function() {
        done();
      }
    }, stream, { origin: 8019, parameter: 'RF' });
  });

  it('check CSV Parser with custom values', (done) => {
    const parser = new CSVParser({
      separator: ",",
      delimiter: "\n",
      headerRow: 0,
      skipRows: 1,
      nanValue: "999",

      origins: "{{csv.0}}",
      parameters: "{{header.3}},{{header.4}},{{header.5}},{{header.6}}",
      datetimes: "{{csv.1}} {{csv.2}}",
      formats: "YYYY-MM-DD HH:mm",
      values: "{{csv.3}},{{csv.4}},{{csv.5}},{{csv.6}}"
    });
    const expectedValues = [
      null, 0, 0.2, null
    ];
    const stream = fs.createReadStream(path.resolve(__dirname, 'sample-02.csv'), { encoding: "utf8"});
    parser.parse({
      log: function(idx, origin, parameter, timestamp, value) {
        console.log(idx, origin, parameter, timestamp, value);
      },
      end: function() {
        done();
      }
    }, stream, { origin: 8019, parameter: 'RF' });
  });
});
