import R from 'ramda';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import paths from '../../utils/paths';
import {dependencies} from '../../../package.json';
import common from './webpack.config.common';

export default {
    devtool: 'inline-source-map',
    entry: {
        polyfills: './src/app/polyfills.js',
        main: [
            'eventsource-polyfill',
            './src/app/index'
        ],
        vendor: R.keys(dependencies)
    },
    mode: common.mode,
    module: {
        rules: common.rulesConfig
    },
    node: common.node,
    optimization: common.optimization,
    output: {
        filename: '[name]-[hash].js',
        path: paths.distDir,
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/app/index.ejs',
            title: 'Dynamically pluggable architecture'
        })
    ]
};
