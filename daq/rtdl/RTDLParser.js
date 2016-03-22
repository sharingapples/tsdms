 var aesjs = require('aes-js');


/* A parser for converting RTDL binary input to a raw data array */
module.exports = function(callback, buffer, dataSource) {
  // first validate the buffer size
  var originCode = buffer.readInt32LE(0);
  var dataOrigin = dataSource.getDataOrigin(originCode);
  if (dataOrigin === null) {
    throw "Unknown data origin " + originCode + " in " + dataSource.name;
  }

  var securityCode = dataOrigin.options["security"];
  var res = decrypt(dataOrigin.options["aes"], buffer, 4);
  var packet = new RTDLPacket(res);

  if (packet.readInteger() != securityCode) {
    throw "Invalid security code or encryption key";
  }
  if (packet.readInteger() != 0x95) {
    throw "Invalid Command code, required 0x95";
  }
  if (packet.readShort() != 0x03) {
    throw "Invalid Log Formart, required 0x03";
  }

  var logCount = packet.readByte();
  var result = {
    data: [],
    metaData: {
      readPointer: packet.readInteger(),
      writePointer: packet.readInteger()
    }
  }

  for(var i=0; i<logCount; ++i) {
    result.data.push({
      origin: originCode,
      parameter: packet.readInteger(),
      value: packet.readFloat(),
      timestamp: packet.readFAT32Timestamp(),
      interval: packet.readInteger(),
    });
  }

  callback(result);

}

var RTDLPacket = function(buffer) {
  var position = 0;

  this.readInteger = function() {
    var res = buffer.readInt32LE(position);
    position = position + 4;
    return res;
  }

  this.readShort = function() {
    var res = buffer.readInt16LE(position);
    position += 2;
    return res;
  }

  this.readByte = function() {
    var res = buffer.readInt8(position);
    position += 1;
    return res;
  }

  this.readFloat = function() {
    var res = buffer.readFloatLE(position);
    position += 4;
    return res;
  }

  this.readFAT32Timestamp = function() {
    var num = this.readInteger();

    var second = (num & 0x1f) * 2;
    var minute = (num >> 5) & 0x3f;
    var hour = (num >> 11) & 0x1f;
    var day = (num >> 16) & 0x1f;
    var month = (num >> 21) & 0x0f;
    var year = (num >> 25) + 1980;

    // Javscript month is 0 based
    return new Date(year, month-1, day, hour, minute, second);
  }

  return this;
}

function decrypt(key, source, offset) {
  if (key === null) {
    return source.slice(offset);
  }

  var aes = new aesjs.ModeOfOperation.ecb(key);
  var res = new Buffer(source.length - offset);

  // do the operation in blocks of 16 bytes
  var idx = 0;
  while (offset < source.length) {
    var block = aes.decrypt(source.slice(offset, offset+16));
    block.copy(res, idx);
    idx += 16;
    offset += 16;
  }

  return res;
}
