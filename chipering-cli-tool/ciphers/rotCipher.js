const {shiftCoder, shiftDecoder} = require('./shiftCipher');
const { ROT_SHIFT } = require('./../constants/cipher')

const rotCoder = shiftCoder(ROT_SHIFT);
const rotDecoder = shiftDecoder(ROT_SHIFT);


module.exports = {rotCoder, rotDecoder};
