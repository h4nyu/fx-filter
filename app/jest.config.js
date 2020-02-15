module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)": "identity-obj-proxy"
  },
  globals: {
    'ts-jest': {
      // ts-jest configuration goes here
    }
  }
};
