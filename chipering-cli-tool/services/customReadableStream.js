const {Readable} = require('stream');
const path = require('path');
const fs = require('fs');

class CustomReadableStream extends Readable {
  constructor(inputPath) {
    super();
    this.path = path.resolve(__dirname + `/../${inputPath}`);
    this.fd = null;
  }

  openCallback (err, fd, done) {
    if (err) {
      done(err);
      console.error(err.message)
      process.exit(1);
    } else {
      this.fd = fd;
      done();
    }
  }

  _construct(done) {
    fs.open(this.path, 'r', (err, fd) => this.openCallback(err, fd, done));
  }

  readCallback(err, data, size) {
    if (err) {
      console.error(`${this.path} is not readable`);
      this._destroy(err);
    }

    try {
      if (this.index < data.length) {
        this.push(data.slice(this.index, this.index + size));
        this.index += size;
      } else {
        this.push = null;
      }
    } catch (e) {
      console.error(err.message);
      this._destroy(err);
    }
  }

  _read(size) {
    fs.readFile(this.path, 'utf-8', (err, data) => this.readCallback(err, data, size))
  }

  closeCallback (e) {
    process.exit(1);
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (e) => this.closeCallback(e));
    } else {
      process.exit(1);
    }
  }
}

module.exports = {CustomReadableStream};
