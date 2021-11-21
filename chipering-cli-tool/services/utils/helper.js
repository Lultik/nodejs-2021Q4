const getAlphabetShift = (charCode) => {
  if (charCode > 64 && charCode <= 90) {
    return 65;
  } else if (charCode > 96 && charCode <= 122) {
    return 97;
  } else {
    return null;
  }
}

module.exports = {getAlphabetShift};
