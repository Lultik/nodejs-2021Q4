const {checkParamsCount} = require('./../checkParamsCount');

const {flagNames} = require('../../../constants/flags');

describe('User passes cli argument', () => {

  let correctArgs;
  let duplicatedArgs;
  let mockExit;

  beforeAll(() => {
    correctArgs = [
      [ '-c', '-i', '-o' ],
      [ '-c', '-i' ],
      [ '-c', '-o' ],
      [ '-c' ],
    ];
    duplicatedArgs = [
      [ '-c', '-c' ],
      [ '--config', '-c' ],
      [ '--config', '--config' ],
      [ '-i', '-i' ],
      [ '-o', '-o' ],
    ]
  })

  beforeEach(() => {
    mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
  })
  //
  test('User passes the same cli argument once', () => {

    for (let i = 0; i < correctArgs.length; i++) {
      checkParamsCount(correctArgs[i]);
      expect(mockExit).not.toHaveBeenCalledWith(1);
    }
  });

  test('User passes the same cli argument twice', () => {
      const mockError = jest.spyOn(console, 'error').mockImplementation(() => {
      });

    for (let i = 0; i < duplicatedArgs.length; i++) {
      checkParamsCount(duplicatedArgs[i]);

      expect(mockError).toHaveBeenCalledWith(expect.stringMatching(/To many (config|input|output) parameters/));
      expect(mockExit).toHaveBeenCalledWith(1);
    }
  });

})
