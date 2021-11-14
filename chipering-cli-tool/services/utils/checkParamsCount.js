const {flagAlias, flagNames} = require('../../constants/flags.js')


const checkParamsCount = (args) => {
  try {
    Object.entries(flagAlias).forEach(([key, value]) => {
      let flagCount = 0;

      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if(arg === value[0] || arg === value[1] ) {
          flagCount += 1;
        }
      }

      if(flagCount > 1) throw Error(`To many ${flagNames[key.toUpperCase()]} parameters`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = {checkParamsCount};
