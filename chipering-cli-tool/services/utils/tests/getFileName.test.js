const { getFileName } = require('../getFileName');
const { flagNames } = require('../../../constants/flags');

describe('Check file names', () => {
  let args;
  let mode;
  beforeEach(() => {
    args = {
      [flagNames.INPUT]: ['-i', 'longInput.txt'],
      [flagNames.OUTPUT]: ['--output', 'output.txt'],
    };
    mode = [flagNames.INPUT, flagNames.OUTPUT];
  })

  test('Return correct file name if it exists in args', () => {
    for (let i = 0; i < mode.length; i++) {
      expect(getFileName(args[mode[i]], mode[i])).toBe(args[mode[i]][1]);
    }
  });

  test('Returns null if flag doesn\'t exist', () => {
    expect(getFileName([], mode)).toEqual(null);
  });

  test('Throw error if there is no args pass in function', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockError = jest.spyOn(console, 'error').mockImplementation(() => {});

    getFileName();
    expect(mockError).toHaveBeenCalledWith("No args passed");
    expect(mockExit).toHaveBeenCalledWith(1);
  })
})
