const { Transform } = require('stream');

const {ALPHABET_LENGTH} = require("../constants/cipher");
const {shiftCipher} = require("./shiftCipher");

const aCoderHelper = shiftCipher((letterAlphabetOrder) => ALPHABET_LENGTH - letterAlphabetOrder - 1)(0);

class ACoder extends Transform {
  constructor() {
    super();
  }
  _transform(chunk, encoding, done) {
    try {
      const result = aCoderHelper(chunk.toString());

      done(null, result);
    } catch (error) {
      done(error, null);
    }
  }
}

module.exports = {ACoder};
