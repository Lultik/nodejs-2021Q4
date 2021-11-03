const {ALPHABET_LENGTH} = require("../constants/cipher");
const {shiftCipher} = require("./shiftCipher");

const aCoder = shiftCipher((letterAlphabetOrder) => ALPHABET_LENGTH - letterAlphabetOrder - 1)(0);

module.exports = {aCoder};
