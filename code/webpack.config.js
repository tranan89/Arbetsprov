var path = require('path'),
    webpack = require('webpack'),
    ComponentResolverPlugin = require('component-resolver-webpack');

module.exports = {
    devtool: 'source-map',
    debug: true,

    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './app/bootstrap'
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    resolve: {
        root: path.resolve(__dirname, 'app'),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx', '.json']
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'react-hot',
                    'babel'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: [
                    'style?sourceMap',
                    'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'postcss?sourceMap'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                loader: 'file'
            }
        ]
    },

    postcss: function (webpack) {
        return [
            require('postcss-import')({
                addDependencyTo: webpack,
                path: 'app'
            }),
            require('postcss-nested'),
            require('postcss-cssnext')({
                browsers: ['last 2 versions']
            })
        ];
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ResolverPlugin([
            new ComponentResolverPlugin()
        ])
    ]
};