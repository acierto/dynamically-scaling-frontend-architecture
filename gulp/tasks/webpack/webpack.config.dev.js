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
    mode: 'development',
    module: {
        rules: [
            {
                exclude: /(node_modules|tmp)/,
                loader: 'babel-loader',
                options: {
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel']
                },
                test: /\.js$/
            },
            ...common.rulesConfig
        ]
    },
    node: {module: 'empty'},
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/
                },
                default: false
            }
        }
    },
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
