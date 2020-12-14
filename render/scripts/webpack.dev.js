/** @format */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
    mode: 'development',
    entry: {
        app: [path.join(__dirname, '../src/main.dev.jsx')],
    },
    output: {
        path: path.join(process.cwd(), 'render-process'),
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
                exclude: [path.join(process.cwd(), 'node_modules')],
            },
        ],
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.jsx', '.js'],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(process.cwd(), 'public/index.html'),
            title: 'demo',
            favicon: path.join(process.cwd(), 'public/favicon.ico'),
            filename: "index.html",
            minify: true,
        }),
    ],
    target: 'electron-renderer',
};

module.exports = devConfig;
