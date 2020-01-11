export default {
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
        {loader: 'url-loader', test: /\.(png|svg|jpg|woff|woff2|eot|ttf|otf)/}
    ]
};
