module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
    '@store/(.*)': '<rootDir>/store/$1',
    '@components/(.*)': '<rootDir>/components/$1',
    '@styles/(.*)': '<rootDir>/styles/$1',
    '@utils/(.*)': '<rootDir>/utils/$1',
  },
};
