const {Transform} = require('stream')
const {caesarCoder, caesarDecoder} = require('./caesarCipher');
const {rotCoder, rotDecoder} = require('./rotCipher');
const {aCoder} = require('./aCipher');


class CipherTransformStream extends Transform {
  constructor(config) {
    super();

    this.pipeline = config.map(el => {
      switch (el) {
        case 'C1':
          return caesarCoder;
        case 'C0':
          return caesarDecoder;
        case 'R1':
          return rotCoder;
        case 'R0':
          return rotDecoder;
        case 'A':
          return aCoder;
        default:
          return () => {};
      }
    });
  }

  _transform(chunk, encoding, done) {
    const result = this.pipeline.reduce((acc, cur)  => cur(acc), chunk.toString())

    done(null, result);
  }
}

module.exports = {CipherTransformStream};
