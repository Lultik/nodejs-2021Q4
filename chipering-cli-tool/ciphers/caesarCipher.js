const {shiftCoder, shiftDecoder} = require('./shiftCipher');
const { CAESAR_SHIFT } = require('./../constants/cipher')

const caesarCoder = shiftCoder(CAESAR_SHIFT);
const caesarDecoder = shiftDecoder(CAESAR_SHIFT);


module.exports = {caesarCoder, caesarDecoder};
