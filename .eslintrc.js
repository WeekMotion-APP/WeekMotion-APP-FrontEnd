module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'no-tabs': 'off',
    'quote-props': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'always',
        endOfLine: 'lf',
        embeddedLanguageFormatting: 'auto',
      },
    ],
  },
};
