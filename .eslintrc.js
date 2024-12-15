// eslint-disable prettier/prettier
module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:prettier/recommended', // Add this line
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'off',
  },
};
