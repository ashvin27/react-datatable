const webpack = require('webpack'),
    path = require('path');
  
module.exports = {
    entry: './src/ReactDatatable.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production') // production development
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            /*{
                test: /\.(png|jpg|gif)$/,
                use:  {
                    loader: 'file-loader',
                    options: {}
                }
            },*/
            {
                test: /\.(png|jpg|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {}
                }
            }
        ]
    },
    externals: {
        'react': 'commonjs react'
    }
};