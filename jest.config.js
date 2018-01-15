module.exports = {
  rootDir: './src/',
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
  moduleNameMapper: {
    ['\\.scss$']: '<rootDir>/stylesMock.js'
  },
  moduleDirectories: [
    'node_modules',
    'src/components/'
  ]
};
