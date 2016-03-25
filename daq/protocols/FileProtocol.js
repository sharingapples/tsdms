"use strict";

const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

class FileRequest {
  constructor(protocol, basePath) {
    Object.defineProperties(this, {
      protocol: { value: protocol },
      basePath: { value: basePath }
    });
  }

  getStream() {
    return fs.createReadStream(path.resolve(this.protocol.srcFolder, this.basePath));
  }

  ignore(error) {
    // TODO: Looks like it would be a good idea to unlink the file here
  }

  abort(error) {
    // TODO: Keep log of this error
  }

  finalize(response) {
    // This is where the file should be archvied
    this.protocol.archive(this.basePath);
  }
}
class FileProtocol {
  /**
   * Start the file protocol watching for addition of any files in
   * the srcFolder folder, as soon as a new file is detected, it sends an event
   * to the requestHandler with the data stream and properties. Once the callback
   * completes it process, the file is copied to the dumpFolder. The files are
   * copied are organized in the dumpFolder with year/month/day folder structure
   * and
   */
  constructor(srcFolder, archiveFolder, requestHandler) {
    this.srcFolder = path.resolve(srcFolder);
    this.archiveFolder = path.resolve(archiveFolder);
    this.requestHandler = requestHandler;

    // if the srcFolder doesn't exist creates it
    FileProtocol.mkdirs(srcFolder, (err) => {
      if (err) {
        requestHandler.onError(err);
      }

      this.scan();
    });
  }

  scan() {
    if (this._watcher) {
      this._watcher.close();
    }

    this._watcher = chokidar.watch(this.srcFolder, {
      ignored: /[\/\\]\./     // Ignore dot files
    });

    // Register event for file addition
    this._watcher.on('add', (path) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          this._handleError(err);
        } else {
          this._processFile(path, stats);
        }
      });
    });

    // Register event for folder addition
    this._watcher.on('addDir', (path) => {
      this._processDir(path);
    });

    // At start up go through all the files in the srcFolder folder
    fs.readdir(this.srcFolder, (err, files) => {
      if (err) {
        this._handleError(err);
      } else {
        files.forEach( (file) => {
          // Ignore dot files
          if (file.startsWith('.')) {
            return;
          }
          this._process(path.resolve(this.srcFolder, file));
        });
      }
    });
  }

  /** Remove the given file from the source location and move it to the
   *  archive folder. This method has to be invoked by the processor
   *  after the request has been handled
   */
  archive(file) {
    const now = new Date();
    const destFolder = path.dirname(path.resolve(
      this.archiveFolder,
      (now.getYear()+1900).toString(),
      (now.getMonth() + 1).toString(),
      now.getDate().toString(),
      file
    ));

    FileProtocol.mkdirs(destFolder, (err) => {
      fs.rename(
        path.resolve(this.srcFolder, file),
        path.resolve(destFolder, path.basename(file)),
        (err) => {
          if (err) {
            this._handleError(err);
          }
        }
      );
    });
  }

  // Stat the given file to check if its a file or folder
  // in case of folder we want to do a recursive search for files
  _process(file) {
    fs.stat(file, (err, stats) => {
      if (err) {
        this._handleError(err);
      } else if (stats.isFile()) {
        this._processFile(file, stats);
      } else if (stats.isDirectory()) {
        this._processDir(file);
      }
    });
  }

  // Recursively process all files within the directory
  _processDir(dir) {
    fs.readdir(dir, (err, files) => {
      if (err) {
        this._handleError(err);
      } else {
        files.forEach(file => {
          // Ignore dot files
          if (file.startsWith('.')) {
            return;
          }
          this._process(path.resolve(dir, file));
        });
      }
    })
  }

  // Process file with the given full path
  _processFile(filePath, stats) {
    const filename = path.basename(filePath);
    const stream = fs.createReadStream(filePath);
    const basePath = filePath.substr(this.srcFolder.length+1);
    this.requestHandler.onRequest(new FileRequest(this, basePath), {
      path: basePath,
      filename: filename,
      timestamp: stats.ctime
    })
  }

  _handleError(err) {
    this.requestHandler.onError(err);
  }
}

// Create all the directories, similar to java mkdirs() method
function mkdirs(dir, callback) {
  fs.stat(dir, (err, stats) => {
    if (err && err.errno === -2) {
      // ENOENT : No such file or directory
    } else if (err) {
      return callback(err, null);
    } else {
      if (stats.isDirectory()) {
        return callback(null, dir);
      } else {
        return callback("Cannot create '" + dir + "'", null);
      }
    }

    const pos = dir.lastIndexOf(path.sep);
    if (pos === -1) {
      return callback("No parent directory available");
    }

    mkdirs(dir.substring(0, pos), (err) => {
      if (err) {
        return callback(err);
      }
      fs.mkdir(dir, callback);
    });
  });
}

FileProtocol.mkdirs = function(dir, callback) {
  return mkdirs(path.resolve(dir), callback)
}


module.exports = FileProtocol;
