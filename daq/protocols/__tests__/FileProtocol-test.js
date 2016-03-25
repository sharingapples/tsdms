"use strict";

jest.unmock('../FileProtocol');
jest.unmock('chokidar');
jest.unmock('path');
jest.unmock('fs');


var path = require('path');
var FileProtocol = require('../FileProtocol');

describe('FileProtocol', () => {
  // it('check mkdirs', (done) => {
  //   FileProtocol.mkdirs("tmp/test/one", (err, res) => {
  //     if (err) {
  //       throw err
  //     }
  //
  //     done();
  //   })
  // });

  // it('check detection', (done) => {
  //   var pcol = new FileProtocol(
  //     path.resolve(__dirname, '_files'),
  //     path.resolve(__dirname, '_archive'),
  //     {
  //       onRequest: function(pcol, stream, args) {
  //         console.log(args);
  //       },
  //
  //       onError: function(err) {
  //         console.error(err);
  //       }
  //     }
  //   );
  // });
});
