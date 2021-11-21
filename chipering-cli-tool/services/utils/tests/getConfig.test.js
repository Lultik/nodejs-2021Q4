const {getConfig} = require('../getConfig');
const {flagNames, flagAlias} = require('../../../constants/flags');

describe('Passing config arguments', () => {
  let args;
  let mode;
  let config1;
  let config2;
  let results;
  let mockExit;
  let mockError

  beforeEach(() => {
    args = [ "C1-C1-R0-A", "C1-C0-A-R1-R0-A-R0-R0-C1-A", "A-A-A-R1-R0-R0-R0-C1-C1-A", "C1-R1-C0-C0-A-R0-R1-R1-A-C1" ];
    mode = flagAlias[flagNames.CONFIG];
    results = args.map((item) => item.split('-'));

    config1 = args.map((it) => [ mode[0], it ]);
    config2 = args.map((it) => [ mode[1], it ]);

    mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    });
    mockError = jest.spyOn(console, 'error').mockImplementation(() => {
    });
  })

  afterEach(() => {
    mockExit.mockClear();
    mockError.mockClear();
  });

  test('Return correct configs', () => {
    for (let i = 0; i < args.length; i++) {
      expect(getConfig(config1[i])).toEqual(results[i])
      expect(getConfig(config2[i])).toEqual(results[i])
    }
  });

  test('User doesn\'t pass -c or --config argument', () => {

    getConfig([ '-i', 'asdasd' ])
    expect(mockError).toHaveBeenCalledWith("Parameters has no config");
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test('User passes incorrent symbols in argument for --config', () => {

    getConfig([ '-c', 'C2-C1', '-i', 'asdasd' ]);
    expect(mockError).toHaveBeenCalledWith("Please, input correct config params");
    expect(mockExit).toHaveBeenCalledWith(1);
  })
})
