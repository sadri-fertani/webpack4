const path = require("path");
//const extractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
    context: path.resolve("js"),
    //entry: ["./app"],
    entry: {
        about: "./about_page.js",
        contact: "./contact_page.js",
        home: "./home_page.js"
    },
    output: {
        path: path.resolve("build/js"),
        publicPath: "/public/assets/js/",
        filename: "[name].js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css"
        })
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
            }
        ]
    },
    resolve: {
        extensions: [".js", ".es6"]
    },
    watch: true,
    mode: "none",       // dev ou production
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 9000
    }
};

module.exports = config;