/** @format */

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const devConfig = require('./webpack.dev');

const app = express();
const compiler = webpack(devConfig);

const publicPath = devConfig.output.publicPath;

const instance = webpackDevMiddleware(compiler, {
    publicPath,
});

app.use(instance);

app.listen(4000, () => {
    console.log(`render is listening on port 4000!\n`);
});