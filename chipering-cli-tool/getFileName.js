const {flagAlias} = require('./constants/flags.js')

const getFileName = (args, mode) => {
  let inputFileName = '';

  const flags = flagAlias[mode];

  try {
    const parameterIndex = args.findIndex(el => flags.indexOf(el) >= 0);

    if (parameterIndex === -1) {
      throw Error(`Parameters has no ${mode} flag`)
    }

    inputFileName = args[parameterIndex + 1];

    if (!inputFileName) {
      throw Error(`${mode} file name is absent today!`)
    }

  } catch (e) {
    console.error(e.message)
    process.exit(1);
  }
  return inputFileName;
}

module.exports = {getFileName};
