const {getAlphabetShift} = require('../helper');

describe('Helper function', () => {
  let ALPHABET;
  let SYMBOLS;
  beforeEach(() => {
    ALPHABET = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
    SYMBOLS = [ 'ф', 'Л', 'Ë', ' ', '!', '&' ]
  })

  test('Returns right number for small letters', () => {
    for (let i = 0; i < ALPHABET.length; i++) {
      const letter = ALPHABET[i].toLowerCase().charCodeAt(0);
      expect(getAlphabetShift(letter)).toBe('a'.charCodeAt(0));
    }
  });

  test('Return right number for big letters', () => {
    for (let i = 0; i < ALPHABET.length; i++) {
      const letter = ALPHABET[i].charCodeAt(0);
      expect(getAlphabetShift(letter)).toBe('A'.charCodeAt(0));
    }
  });

  test('Returns null with non alphabetical symbols', () => {
    for (let i = 0; i < SYMBOLS.length; i++) {
      const symbol = SYMBOLS[i].charCodeAt(0);
      expect(getAlphabetShift(symbol)).toEqual(null);
    }
  })
})
