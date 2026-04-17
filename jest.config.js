module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|nativewind|clsx)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(png|jpg|jpeg|gif|svg|ttf|otf)$": "<rootDir>/__mocks__/fileMock.js",
  },
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "constants/**/*.{ts,tsx}",
    "!**/__tests__/**",
    "!**/node_modules/**",
  ],
};