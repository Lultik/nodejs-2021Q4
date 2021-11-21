const fs = require('fs');
const {CustomWritableStream} = require("../customWritableStream");
jest.mock('fs');

describe('Test CustomReadableStream', () => {

  let mockExit;
  let mockError;
  let writeStream;
  let outputFile;

  beforeAll(() => {
    mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    });
    mockError = jest.spyOn(console, 'error').mockImplementation(() => {})
    outputFile = './shortInput.txt';
  })

  beforeEach(() => {
    writeStream = new CustomWritableStream(outputFile);
  })

  describe('Opening files', () => {

    test('should call fs open', () => {
      writeStream._construct();
      const fsOpen = jest.spyOn(fs, 'open')

      expect(fsOpen).toHaveBeenCalled();
    });

    test('should handle error while opening', () => {
      writeStream.constructCallback({message: 'Error'});

      expect(mockExit).toHaveBeenCalledWith(1);
    });

  })

  describe('Writing files', () => {

    let doneCb;

    beforeEach(() => {
      doneCb = jest.fn().mockImplementation((error) => {})
    })

    test('should call fs appendFile', () => {
      writeStream._write('asdasd', 'utf-8', doneCb);

      const fsAppendFile = jest.spyOn(fs, 'appendFile')
      expect(fsAppendFile).toHaveBeenCalled();
    });

    test('should handle error while reading', () => {
      writeStream.appendCallback({message: 'Error'});

      expect(mockExit).toHaveBeenCalledWith(1);
    });

    test('Cathing error while appending', () => {
      const errorAppend = jest.spyOn(fs, 'appendFile').mockImplementation(() => {
        throw Error('Error');
      });

      writeStream._write('hello', "utf-8", doneCb);
      expect(mockExit).toHaveBeenCalledWith(1);
    });

  })
})
