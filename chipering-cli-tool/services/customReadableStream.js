const {Readable} = require('stream');
const path = require('path');
const fs = require('fs');

class CustomReadableStream extends Readable {
  constructor(inputPath) {
    super();
    this.path = path.resolve(__dirname + `/../${inputPath}`);
    this.index = 0;


  }

  _read(number) {
    try {
      fs.readFile(this.path, 'utf-8', (err, data) => {
        if (err) {
          console.error(`${this.path} ${err ? 'is not readable' : 'is readable'}`);
          process.exit(1);
        } else {
          if (this.index < data.length) {
            this.push(data.slice(this.index, this.index + number));
            this.index += number;
          } else {
            this.push(null);
          }
        }
      })
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }
}

module.exports = {CustomReadableStream};
