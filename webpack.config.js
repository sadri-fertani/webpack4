const Path = require("path");
//const extractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TimestampWebpackPlugin = require("timestamp-webpack-plugin");
const WebPack = require("webpack");

let config = {
    context: Path.resolve("js"),
    //entry: ["./app"],
    entry: {
        about: "./about_page.js",
        contact: "./contact_page.js",
        home: "./home_page.js"
    },
    output: {
        path: Path.resolve("build/js"),
        publicPath: "/public/assets/js/",
        filename: "[name].js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css"
        }),
        new WebPack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new TimestampWebpackPlugin({
            path: __dirname,
            filename: "timestamp.json"
        }),
        new WebPack.BannerPlugin("*************************\nGenerated by WebPack (SF)\n*************************\n")
    ],
    // optimization : remove me <-> null
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "shared",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    {
                        loader: "jshint-loader",
                        options: {
                            camelcase: true,
                            emitErrors: false,
                            failOnHint: false
                        }
                    }
                ]
            },
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: "babel-loader"      // transcript es6 -> js
            },
            // {
            //     test: /\.css$/,
            //     exclude: /node_modules/,
            //     loader: "style-loader!css-loader"      // inject css into js
            // },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                exclude: /node_modules/,
                loader: "url-loader?limit=100000"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".es6"]
    },
    watch: true,
    mode: "none",       // dev ou production
    devServer: {
        contentBase: Path.join(__dirname, "public"),
        compress: true,
        port: 9000
    }
};

module.exports = config;