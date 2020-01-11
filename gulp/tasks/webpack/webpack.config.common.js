export default {
    mode: 'development',
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
    rulesConfig: [
        {test: /\.css$/, use: ['style-loader', 'css-loader']},
        {exclude: /tmp/, loader: 'html-loader', test: /\.html$/},
        {
            test: /\.less$/,
            use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: {importLoaders: 1}
                }, 'less-loader?sourceMap']
        },
        {loader: 'url-loader', test: /\.(png|svg|jpg|woff|woff2|eot|ttf|otf)/},
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
        }
    ]
};
