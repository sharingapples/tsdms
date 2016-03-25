"use strict";

var express = require('express');
var path = require('path');

/* Each individual HTTP request */
class HTTPRequest {
  constructor(req, res) {
    Object.defineProperties(this, {
      req: { value: req },
      res: { value: res }
    });
  }

  getStream() {
    return this.req;
  }

  ignore(error) {
    this.res.status(404).send(error);
  }

  abort(error) {
    this.res.status(500).send(error);
  }

  finalize(response) {
    this.res.status(200).send(response);
  }
}

class HTTPProtocol {
  constructor(port, archiveFolder, requestHandler) {
    this.archiveFolder = path.resolve(archiveFolder);
    this.requestHandler = requestHandler;

    this.app = express();
    this.app.listen(port);
    this.app.use('/*', (req, res) => {
      requestHandler.onRequest(
        new HTTPRequest(req, res),
        {
          path: req.baseUrl,
          header: req.headers,
          query: req.query
        }
      );
    });
  }
}

module.exports = HTTPProtocol;
