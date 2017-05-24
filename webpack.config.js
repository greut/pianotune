const path = require('path')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')

module.exports = {
    entry: {
        'vendor': './src/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id]-[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.scss'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
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
        }),
        new UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            },
            mangle:  {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            },
            sourceMap: true
        })
    ]
}
