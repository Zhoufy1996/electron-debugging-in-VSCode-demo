/** @format */
/** @format */

const path = require('path');

const mainConfig = {
    target: 'electron-main',
    mode: 'development',
    entry: path.join(__dirname, '../main.js'),
    output: {
        filename: 'main.js',
        path: path.join(process.cwd(), 'main-process'),
    },

    devtool: 'source-map',
    resolve: {
        extensions: ['.js'],
    },
    node: {
        __dirname: false,
        __filename: false,
    },
};

module.exports = mainConfig;
