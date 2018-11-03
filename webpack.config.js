const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: "./src/App.js",//入口文件，从它开始关联所有要打包的js文件
    output: {
        path: __dirname,//nodejs提供给模块的特殊变量，绝对路径
        filename: "Chat.js"//打包后生成的整合文件
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                query: {
                    presets: ["env", "react"]
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" },
                {
                    loader: "css-loader",
                   /* options: {
                        modules: true, // 指定启用css modules
                        localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                    }*/
                }
                ]
            }]

    },
   // devtool: "eval-source-map",导致压缩不起效
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
}
