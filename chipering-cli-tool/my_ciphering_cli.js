const {pipeline} = require('stream');

const {flagNames} = require('./constants/flags.js')
const {getFileName, getConfig, checkParamsCount} = require('./services/utils/')

const {CustomReadableStream, CustomWritableStream} = require('./services');
const {CaesarCoder, CaesarDecoder, RotCoder, RotDecoder, ACoder} = require('./ciphers');

const args = process.argv.slice(2);

checkParamsCount(args);

const config = getConfig(args);

const inputFileName = getFileName(args, flagNames.INPUT);
const outputFileName = getFileName(args, flagNames.OUTPUT);

const readStream = inputFileName ? new CustomReadableStream(inputFileName) : process.stdin;
const writeStream = outputFileName ? new CustomWritableStream(outputFileName) : process.stdout;

const transformStreamPipeline = config.map((configElem) => {
  switch (configElem) {
    case 'C1':
      return new CaesarCoder();
    case 'C0':
      return new CaesarDecoder();
    case 'R1':
      return new RotCoder();
    case 'R0':
      return new RotDecoder();
    case 'A':
      return new ACoder();
  }
})

pipeline(readStream, ...transformStreamPipeline, writeStream, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  } else {
    console.log('\x1b[33m%s\x1b[4m', 'Successfully cracked!\nStarting download personal data...');
    console.log('\x1b[32m%s\x1b[5m', 'Personal data has been downloaded! Thanks!');
  }
});
