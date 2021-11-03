const {createReadStream, createWriteStream} = require('fs');

const {flagNames} = require('./constants/flags.js')
const {getConfig} = require('./getConfig');
const {getFileName} = require('./getFileName')
const {CipherTransformStream} = require("./ciphers/decepticon");

const args = process.argv.slice(2);

const config = getConfig(args);

const inputFileName = getFileName(args, flagNames.INPUT);
const outputFileName = getFileName(args, flagNames.OUTPUT);

const readStream = inputFileName ? createReadStream(inputFileName) : process.stdin;
const writeStream = outputFileName ? createWriteStream(outputFileName) : process.stdout;

const transformStream = new CipherTransformStream(config);

readStream
  .on('error', (e) => {
    console.error(e.message);
    process.exit(1);
  })
  .on('data', () => {
    console.log('\x1b[33m%s\x1b[4m', 'Successfully cracked!\nStarting download personal data...');
  })
  .on('end', () => {
    console.log('\x1b[32m%s\x1b[5m', 'Personal data has been downloaded! Thanks!');
    process.stdin.pause();
  })
  .pipe(transformStream)
  .pipe(writeStream);

