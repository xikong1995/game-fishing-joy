const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.common');

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        contentBase: './dist',
        port: 8002,
        hot: true,
    },
});
