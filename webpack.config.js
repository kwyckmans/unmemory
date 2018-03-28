const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")


const plugins = [
    new HtmlWebpackPlugin({
        title: 'Typescript Webpack Starter',
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            tslint: {
                emitErrors: true,
                failOnHint: true
            }
        }
    })
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
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.js$/, loader: "source-map-loader", enforce:"pre" },
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist/'),
        compress: true,
        port: 3000,
        hot: true
    }
    // Other options...
};