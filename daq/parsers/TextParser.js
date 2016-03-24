"use strict";
const Mustache = require('mustache');
const moment = require('moment');

class TextParser {
  constructor(options) {
    this.header = options.header ? new RegExp(options.header, 'g') : null;   // Can be null
    // A body can also be null as the data may be contained in
    // other filter arguments, like query, headers, etc
    this.body = options.body ? new RegExp(options.body, 'g') : null;       // Can be null

    this.nanValue = options.nanValue;
    this.origins = options.origins.split(",");
    this.parameters = options.parameters.split(",");
    this.datetimes = options.datetimes.split(",");
    this.formats = options.formats.split(",");
    this.values = options.values.split(",");

    this.maxLoopCount = Math.max(this.origins.length, this.parameters.length, this.datetimes.length, this.formats.length, this.values.length);
  }

  parse(session, stream, args) {
    let text = "";
    let header = [];
    let body = [];
    stream.on('data', (chunk) => {
      // consolidate the date to process at the end
      text += chunk;
    });

    stream.on('end', () => {
      // First parse out the header if available
      if (this.header) {
        header = this.header.exec(text);
        text=text.substr(this.header.lastIndex);
      }

      let lastIndex = -1;
      if (this.body) {
        body = this.body.exec(text);
        lastIndex = this.body.lastIndex;
      }
      //console.log("Text, Body", text, body, "LastIndex: ", lastIndex);
      // process the data received
      let count = 0;
      do {
        this.process(session, args, header, body, ++count);
        if (lastIndex > 0) {
          body = this.body.exec(text);
          lastIndex = this.body.lastIndex;
        } else {
          break;
        }
      } while (lastIndex > 0);

      session.end();
    });
  }

  process(session, args, header, body, index) {
    const view = Object.assign({}, args);
    view.header = header;
    view.body = body;

    for(let i=0; i<this.maxLoopCount; ++i) {
      const origin = Mustache.render(this.origins[i%this.origins.length], view);
      const parameter = Mustache.render(this.parameters[i%this.parameters.length], view);
      const datetime = Mustache.render(this.datetimes[i%this.datetimes.length], view);
      const format = Mustache.render(this.formats[i%this.formats.length], view);
      const value = Mustache.render(this.values[i%this.values.length], view);

      const timestamp = moment(datetime, format);
      const val = ((this.nanValue && this.nanValue === value) ? null : parseFloat(value));

      session.log(index, origin, parameter, timestamp.toDate(), val);
    }
  }
}

module.exports = TextParser;
