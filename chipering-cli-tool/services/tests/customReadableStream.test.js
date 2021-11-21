const fs = require('fs');
const {CustomReadableStream} = require('./../customReadableStream');
jest.mock('fs');

describe('Test CustomReadableStream', () => {

  let mockExit;
  let mockError;
  let readStream;
  let inputFile;

  beforeAll(() => {
    mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    mockError = jest.spyOn(console, 'error').mockImplementation(() => {});
    inputFile = './shortInput.txt';
  })

  beforeEach(() => {
    readStream = new CustomReadableStream(inputFile);
  })

  describe('Opening files', () => {
    let doneCB;
    beforeEach(() => {
      doneCB = jest.fn((error) => {});
    })

    test('should call fs open', () => {
      readStream._construct();
      const fsOpen = jest.spyOn(fs, 'open')

      expect(fsOpen).toHaveBeenCalled();
      expect(fsOpen.mock.calls[0][0]).toEqual(expect.stringMatching('shortInput.txt'));
    });

    test('should handle error while opening', () => {
      readStream.openCallback({message: 'Error'}, undefined, doneCB);

      expect(mockExit).toHaveBeenCalledWith(1);
    });

    test('should set right fd', () => {
      readStream.openCallback(null, 42, doneCB);

      expect(readStream.fd).toEqual(42)
    });
  })

  describe('Reading files', () => {

    test('should call fs readFile', () => {
      readStream._read();

      const fsReadFile = jest.spyOn(fs, 'readFile')
      expect(fsReadFile).toHaveBeenCalled();
    });

    test('should handle error while reading', () => {
      readStream.readCallback({message: 'Error'}, undefined, 3);

      expect(mockExit).toHaveBeenCalledWith(1);
    });

    test('should handle error while reading', () => {
      readStream.index = 0;
      readStream.readCallback(null, 'hello', 5);

      expect(readStream.index).toEqual(5);
    });
    test('should stop reading when data ended', () => {
      readStream.index = 10;
      readStream.readCallback(null, 'hello', 5);

      expect(readStream.push).toBeNull()
    });
  })

  describe('Reading files', () => {

    test('should call fs close', () => {
      readStream.fd = 42;

      readStream._destroy();
      const fsClose = jest.spyOn(fs, 'close')
      expect(fsClose).toHaveBeenCalled();
    });

    test('should exit', () => {
      readStream.closeCallback({message: 'Error'});

      expect(mockExit).toHaveBeenCalledWith(1);
    });
  })

})
