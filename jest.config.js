const config = {
  verbose: true,
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
};

module.exports = config;
