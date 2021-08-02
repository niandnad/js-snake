var path = require('path');

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, 'static'),
        noInfo: true,
    },
    devtool: 'eval-source-map',
    entry: ['babel-polyfill', path.resolve(__dirname, './src/index.js')],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'snake.bundle.js',
    },
    module: {
        rules: [
            {
                exclude: [/node_modules/],
                test: /\.js$/,
                use: 'babel-loader',
            },
        ],
    },
};
