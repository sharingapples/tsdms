"use strict";
const Mustache = require('mustache');
const moment = require('moment');

class CSVParser {
  constructor(options) {
    this.separator = options.separator || ",";
    this.delimiter = options.delimiter || "\n";
    this.headerRow = parseInt(options.headerRow || 0);
    this.skipRows = parseInt(options.skipRows || 0);
    this.nanValue = options.nanValue || 0;

    this.origins = options.origins.split(",");
    this.parameters = options.parameters.split(",");
    this.datetimes = options.datetimes.split(",");
    this.formats = options.formats.split(",");
    this.values = options.values.split(",");

    this.maxLoopCount = Math.max(this.origins.length, this.parameters.length, this.datetimes.length, this.formats.length, this.values.length);
  }

  parse(session, stream, args) {
    //console.log("CSVParser::Parse ", stream, args);
    const separator = this.separator;
    const delimiter = this.delimiter;
    const headerRow = this.headerRow;
    const skipRows = this.skipRows;

    let rowText = "";
    let row = 0;
    let headers = [];

    stream.on('data', (chunk) => {
      let idx = 0;
      do {
        const pos = chunk.indexOf(delimiter, idx);
        rowText += chunk.substring(idx, pos === -1 ? chunk.length : pos);
        idx = pos + 1;
        if (pos !== -1) {
          // We found a row to process
          if (headerRow === row) {
            headers = rowText.split(this.separator);
            headers.unshift(rowText);
          } else if (row >= skipRows) {
            // Now process the data
            const csv = rowText.split(this.separator).map(s => s.trim());
            csv.unshift(rowText);
            this.process(session, stream, args, headers, csv, row);
          }
          rowText = "";
          row += 1;
        } else {
          break;
        }
      } while (true);
    });

    stream.on('end', () => {
      if (rowText.length > 0) {
        // Looks like we got a row without a delimiter, we still process it
        this.process(session, stream, args, headers, rowText.split(this.separator), row);
      }

      session.end();
    });
  }

  process(session, stream, args, headers, row, rownum) {
    const view = Object.assign({}, args);
    view.header = headers;
    view.csv = row;

    for(let i=0; i<this.maxLoopCount; ++i) {
      const origin = Mustache.render(this.origins[i%this.origins.length], view);
      const parameter = Mustache.render(this.parameters[i%this.parameters.length], view);
      const datetime = Mustache.render(this.datetimes[i%this.datetimes.length], view);
      const format = Mustache.render(this.formats[i%this.formats.length], view);
      const value = Mustache.render(this.values[i%this.values.length], view);

      const timestamp = moment(datetime, format);
      const val = ((this.nanValue && this.nanValue === value) ? null : parseFloat(value));

      session.log(rownum, origin, parameter, timestamp.toDate(), val);
    }
  }
}

module.exports = CSVParser;
