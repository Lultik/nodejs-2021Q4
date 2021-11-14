const {Writable} = require('stream');
const path = require('path');
const fs = require('fs');

class CustomWritableStream extends Writable {
  constructor(destinationPath) {
    super();
    this.destination = path.resolve(__dirname + `/../${destinationPath}`);

    fs.open(this.destination, 'wx', (err, fd) => {
      if (err) {
        if(err.code === 'EEXIST') {
          return
        }
      }
      try {
        fs.writeFile(this.destination, '', (err) => {
          if(err) throw err;
          console.log('File has been created!')
        })
      } finally {
        fs.close(fd, (err) => {
          if(err) throw err;
        })
      }
    })
  }

  _write(chunk, encoding, next) {
    try {
      fs.appendFile(this.destination, chunk, 'utf-8', (err) => {
        if (err) throw err;
      })
      next(null, chunk);
    } catch (err) {
      next(err, null);
      console.error(err.message);
      process.exit(1);
    }
  }
}

module.exports = {CustomWritableStream};
