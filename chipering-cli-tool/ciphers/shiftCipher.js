const {ALPHABET_LENGTH} = require("../constants/cipher");
const { getAlphabetShift } = require('./helper');

const shiftCipher = (getAlphabeticalOrder) => (shift) => (chunk) => {
  let output = ''
  for (let i = 0; i < chunk.length; i++) {
    const charCode = chunk.charCodeAt(i);

    const alphabetShift = getAlphabetShift(charCode);
    if (!alphabetShift) {
      output += chunk[i];
      continue;
    }

    const letterAlphabetOrder = (charCode - alphabetShift);
    const decodedAlphabetOrder = getAlphabeticalOrder(letterAlphabetOrder, shift);
    const decodedCharCode = decodedAlphabetOrder + alphabetShift;

    output += String.fromCharCode(decodedCharCode);
  }
  return output;
}

const coderFn = (letterAlphabetOrder, caesarShift) => {
  return (letterAlphabetOrder + caesarShift) % ALPHABET_LENGTH;
}

const decoderFn = (letterAlphabetOrder, caesarShift) => {
  return (letterAlphabetOrder - caesarShift + ALPHABET_LENGTH) % ALPHABET_LENGTH;
}


const shiftCoder = shiftCipher(coderFn);
const shiftDecoder = shiftCipher(decoderFn);

module.exports = { shiftCipher, shiftCoder, shiftDecoder};
