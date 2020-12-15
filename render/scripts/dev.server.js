const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const devConfig = require('./webpack.dev');
const { port } = require('../../context');

const initizalize = async () => {
    const app = express();
    const compiler = webpack(devConfig);

    const publicPath = devConfig.output.publicPath;

    const instance = webpackDevMiddleware(compiler, {
        publicPath,
    });

    app.use(instance);

    app.listen(port, () => {
        console.log(`render is listening on port ${port}!\n`);
    });
};

initizalize();
