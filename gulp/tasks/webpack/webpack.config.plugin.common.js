import webpack from 'webpack';
import paths from '../../utils/paths';
import common from './webpack.config.common';
import {externals} from './webpack.externals';

export const buildConfig = (pluginName) => ({
    devtool: 'inline-source-map',
    entry: {
        main: [
            'eventsource-polyfill',
            `./src/plugins/${pluginName}/index`
        ]
    },
    externals,
    mode: common.mode,
    module: {
        rules: common.rulesConfig
    },
    node: common.node,
    output: {
        filename: 'index.js',
        globalObject: 'window',
        library: pluginName,
        libraryTarget: 'umd',
        path: `${paths.pluginsDistDir}/${pluginName}`,
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});
