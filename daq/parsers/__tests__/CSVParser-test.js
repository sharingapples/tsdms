"use strict";

jest.unmock('../CSVParser');
jest.unmock('fs');
jest.unmock('path');
jest.unmock('mustache');

var CSVParser = require('../CSVParser');
var fs = require('fs');
var path = require('path');
console.log("Test CSVParser");

describe('CSVParser', () => {
  // Check CSV with the following information
  // Path: 8019/RF.csv -> /^(?<origin>\d+)/(?<parameter>\w+).csv$/
  // Date, Time, Value
  // 2015-10-12, 12:30, 0
  // 2015-10-12, 13:30, 0
  it('check CSV Parser with standard values', () => {
    console.log("Starting test");
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

    const stream = fs.createReadStream(path.resolve(__dirname, 'sample-01.csv'));
    parser.parse({
      log: function(origin, parameter, timestamp, value) {
        console.log(origin, parameter, timestamp, value);
      },
      end: function() {
        console.log("parsing complete");
      }
    }, stream, { origin: 8019, parameter: 'RF' });
  });
});
