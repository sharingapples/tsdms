"use strict";

const FileProtocol = require('./FileProtocol');

const handler = {
  onRequest: function(pcol, stream, args) {
    let length = 0;

    stream.on('data', (chunk) => {
      length += chunk.length;
    })

    stream.on('end', () => {
      console.log("Received " + length + " bytes of data from ");
      console.log(" Path (args.path): ", args.path);
      console.log(" File (args.filename): ", args.filename);
      console.log(" Timestamp (args.timestamp): ", args.timestamp);

      // Archive the file at the end
      pcol.archive(args.path);
    });
  },

  onError: function(err) {
    console.error(err);
  }
}

const pcol = new FileProtocol('./_files', './_archives', handler);
