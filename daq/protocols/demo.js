"use strict";

const FileProtocol = require('./FileProtocol');
const HTTPProtocol = require('./HTTPProtocol');

const handler = {
  onRequest: function(req, args) {
    let length = 0;
    const stream = req.getStream();

    stream.on('data', (chunk) => {
      length += chunk.length;
    })

    stream.on('end', () => {
      console.log("Received " + length + " bytes of data from ");
      console.log(args);

      req.finalize();
    });
  },

  onError: function(err) {
    debugger;
    console.error("Error ", err);
  }
}

const fileProtocol = new FileProtocol('./_files', './_archives', handler);
const httpProtocol = new HTTPProtocol(3000, './_archives', handler);
