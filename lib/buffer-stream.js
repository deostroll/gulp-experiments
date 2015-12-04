var util = require('util');
var stream = require('stream');

function BufferStream(data) {

  stream.Readable.call(this);
  
  var src = data;
  if(typeof src === 'string') {
    src = new Buffer(src);
  }

  if(!Buffer.isBuffer(src)) {
    throw new Error('Source must be a buffer or string');
  }

  this._source = src;
  this._offset = 0;
  this._length = src.length;

  this.on('end', this._destroy);

}

util.inherits(BufferStream, stream.Readable);

BufferStream.prototype._destroy = function() {
  this._source = null;
  this._offset = null;
  this._length = null;
}

BufferStream.prototype._read = function(size) {
  if(this._offset < this._length) {
    var len = this._offset + size;
    this.push(this._source.slice(this._offset, len));
    this._offset = len;
  }
  else {
    this.push(null);
  }
};

module.exports = BufferStream;
