const {Transform} = require('stream')
const {shiftCoder, shiftDecoder} = require('./shiftCipher');
const {CAESAR_SHIFT} = require('./../constants/cipher')

const caesarCoderHelper = shiftCoder(CAESAR_SHIFT);
const caesarDecoderHelper = shiftDecoder(CAESAR_SHIFT);


class CaesarCoder extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, done) {
    try {
      const result = caesarCoderHelper(chunk.toString());

      done(null, result);
    } catch (error) {
      done(error, null);
    }
  }
}

class CaesarDecoder extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, done) {
    try {
      const result = caesarDecoderHelper(chunk.toString());

      done(null, result);
    } catch (error) {
      done(error, null);
    }
  }
}


module.exports = {CaesarCoder, CaesarDecoder};
