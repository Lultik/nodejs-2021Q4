const flagNames = {
  INPUT: 'input',
  OUTPUT: 'output',
  CONFIG: 'config',
}

const flagAlias = {
  [flagNames.INPUT]: [ '-i', '--input' ],
  [flagNames.OUTPUT]: [ '-o', '--output' ],
  [flagNames.CONFIG]: [ '-c', '--config' ],
}

module.exports = {flagNames, flagAlias};
