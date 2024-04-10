module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-typescript', ['@babel/preset-env', { modules: false }]],
  plugins: [
    'react-refresh/babel',
    ['babel-plugin-direct-import', { modules: ['@mui/material', '@mui/icons-material'] }],
    ['@babel/plugin-transform-runtime'],
  ],
  env: {
    production: {
      presets: ['minify'],
    },
  },
};
