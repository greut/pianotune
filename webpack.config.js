const path = require('path')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')

module.exports = {
    entry: {
        'vendor': './src/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js',
        chunkFilename: '[id]-[chunkhash].js'
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'env',
                                'babili'
                            ]
                        }
                    },
                    'eslint-loader'
                ],
                enforce: 'pre'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
}
