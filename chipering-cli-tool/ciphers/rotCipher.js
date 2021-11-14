const { Transform } = require('stream');

const {shiftCoder, shiftDecoder} = require('./shiftCipher');
const { ROT_SHIFT } = require('./../constants/cipher')

const rotCoderHelper = shiftCoder(ROT_SHIFT);
const rotDecoderHelper = shiftDecoder(ROT_SHIFT);


class RotCoder extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, done) {
    try {
      const result = rotCoderHelper(chunk.toString());

      done(null, result);
    } catch (error) {
      done(error, null);
    }
  }
}

class RotDecoder extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, done) {
    try {
      const result = rotDecoderHelper(chunk.toString());

      done(null, result);
    } catch (error) {
      done(error, null);
    }
  }
}

module.exports = {RotCoder, RotDecoder};
