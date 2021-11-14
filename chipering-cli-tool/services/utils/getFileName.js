const {flagAlias} = require('../../constants/flags.js')

const getFileName = (args, mode) => {
  const flags = flagAlias[mode];

  try {
    const parameterIndex = args.findIndex(el => flags.indexOf(el) >= 0);

    if (parameterIndex === -1) {
      return;
    }

    return args[parameterIndex + 1];
  } catch (err) {
    console.error(err.message)
    process.exit(1);
  }
}

module.exports = {getFileName};
