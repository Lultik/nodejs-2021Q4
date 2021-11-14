const {flagAlias, flagNames} = require('../../constants/flags.js')

const getConfig = (args) => {
  const flags = flagAlias[flagNames.CONFIG];

  let config = '';

  try {
    const parameterIndex = args.findIndex(el => flags.indexOf(el) >= 0);

    if (parameterIndex === -1) {
      throw Error('Parameters has no config')
    }

    config = args[parameterIndex + 1];

    if (!config) {
      throw Error('Config is empty. Add cipher to encode/decode input file')
    }

    const configQueue = config.split('-');

    const isIncorrectParams = !configQueue.every(el => /^([CR][01])|A$/i.test(el));

    if(isIncorrectParams) {
      throw Error('Please, input correct config params')
    }

  } catch (err) {
    console.error(err.message)
    process.exit(1);
  }
  return config.toUpperCase().split('-');
}

module.exports = {getConfig};
