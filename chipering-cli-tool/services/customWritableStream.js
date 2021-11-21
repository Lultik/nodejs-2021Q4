const {Writable} = require('stream');
const path = require('path');
const fs = require('fs');

class CustomWritableStream extends Writable {
  constructor(destinationPath) {
    super();
    this.destination = path.resolve(__dirname + `/../${destinationPath}`);
  }

  constructCallback (err) {
    if (err) {
      console.error('File ne naiden. Poprobuite snova! (Ne poluchitsa)');
      process.exit(1);
    }
  }

  _construct(callback) {
    fs.open(this.destination, (err) => this.constructCallback(err))
  }

  appendCallback (err) {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
  }

  _write(chunk, encoding, done) {
    try {
      fs.appendFile(this.destination, chunk, 'utf-8', (err) => this.appendCallback(err))
      done(null, chunk);
    } catch (err) {
      done(err, null);
      console.error(err.message);
      process.exit(1);
    }
  }
}

module.exports = {CustomWritableStream};
