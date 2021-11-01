const {createReadStream, createWriteStream} = require('fs');
const {flagNames} = require('./constants/flags.js')
const {getParameters} = require('./getConfig');
const {getFileName} = require('./getFileName')
const args = process.argv.slice(2);

const config = getParameters(args);

const inputFileName = getFileName(args, flagNames.INPUT);
const outputFileName = getFileName(args, flagNames.OUTPUT);

const readStream = createReadStream(inputFileName);
const writeStream = createWriteStream(outputFileName);

readStream
  .on('error', (e) => {
    console.error(e.message);
    process.exit(1);
  })
  .on('end', () => {
    writeStream.end();
  })
  .pipe(writeStream);


