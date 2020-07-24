const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack');

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(svg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:6].[ext]',
                            outputPath: 'images',
                            publicPath: 'images',
                            emitFile: true,
                            esModule: false
                        }
                    },
                    {
                        loader: ImageMinPlugin.loader, 
                        options:{
                            bail: false,
                            cache: false,
                            imageminOptions: {
                                plugins: [
                                    ["gifsicle", { interlaced: true }],
                                    ["svgo", {
                                        plugins: [
                                            {removeViewBox: false}
                                        ]
                                        }
                                    ]
                                ]
                            }
                        }
                    }
                ] 
            },
            {
                test: /\.(jpeg|png|jpg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:6].[ext]',
                            outputPath: 'images',
                            publicPath: 'images',
                            emitFile: true,
                            esModule: false
                        }
                    },
                    {
                        loader: 'webp-loader',
                        options:{
                            quality: 13
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist',
        open: true,
        compress: true,
        port: 3000
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })]


}