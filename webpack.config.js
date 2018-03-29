const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')


const plugins = [
    new HtmlWebpackPlugin({
        title: 'Verget uwe naam en al de rest!!',        
        template: '!!ejs-loader!src/index.html',
        favicon: 'beer.png'
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            tslint: {
                emitErrors: true,
                failOnHint: true
            }
        }
    }),
    new FaviconsWebpackPlugin('./beer.png')
];

module.exports = {
    context: path.resolve('./src'),
    entry: {
        app: "./index.ts"
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].bundle.js',
        
    },
    mode: "development",
    // Enable sourcemaps for debugging webpack's output.
    devtool: "inline-source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    plugins: plugins,
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.js$/,
                loader: "source-map-loader",
                enforce: "pre"
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name:'[path][name].[ext]'
                }
            }
        ]
    },
    node: {
        fs: "empty"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist/'),
        compress: true,
        port: 3000,
        hot: true
    }, // Other options...
};