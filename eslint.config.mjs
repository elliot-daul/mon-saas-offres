import next from 'eslint-config-next'

export default [
  {
    ...next,
    rules: {
      ...next.rules,
      "react/no-unescaped-entities": "off"
    },
  },
];
