const webpack = require('webpack'),
    path = require('path');
  
module.exports = {
    entry: './example/src/index.js',
    output: {
        path: path.resolve(__dirname, 'example/dist'),
        filename: 'index.js',
        // libraryTarget: 'commonjs2'
    },
    watch: true,
    plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development') // production development
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
                
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {}
                }
            }
        ]
    },
};