import webpack from 'webpack';
import paths from '../../utils/paths';
import common from './webpack.config.common';
import {externals} from './webpack.externals';

export const buildConfig = (moduleName) => ({
    devtool: 'inline-source-map',
    entry: {
        main: [
            'eventsource-polyfill',
            `./src/modules/${moduleName}/index`
        ]
    },
    externals,
    mode: common.mode,
    module: {rules: common.rulesConfig},
    node: common.node,
    output: {
        filename: 'index.js',
        globalObject: 'window',
        library: moduleName,
        libraryTarget: 'umd',
        path: `${paths.modulesDistDir}/${moduleName}`,
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});
