var webpack = require("webpack");
var path = require("path");

var config = {
    entry:{
        app:"./src/main.js",
    },
    output:{
        filename:"iLoading.js",
        path:path.resolve(__dirname,"dist"),
        library:"ILoading",
        libraryTarget:"umd",
        publicPath:"/assets/"
    },
    devtool:"source-map",
    devServer:{
        contentBase:path.resolve(__dirname,"./demo"),
        port:9001,
        compress:true,
        noInfo:true,
        hot:true
    },
    resolve:{
        alias:{
            jquery$:path.resolve(__dirname,"lib/jquery.min.js")
        }
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                loader:"style-loader!css-loader?minimize!sass-loader"
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader",
                query:{
                    presets:['es2015']
                }
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:"jquery"
        })
    ]
}


module.exports = config;