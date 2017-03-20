var webpack = require("webpack");
var path = require("path");

var output = {
    path:path.resolve(__dirname,"dist"),
    library:"ILoading",
    libraryTarget:"umd",
    publicPath:"/assets/"
};
var plugins = [
    new webpack.ProvidePlugin({
        $:"jquery"
    })
]
var config = {
    entry:{
        app:"./src/main.js",
    },
    devtool:"source-map",
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
    }
}

var NODE_ENV = process.env.NODE_ENV || "development";


if(NODE_ENV === "production"){
    output.filename = "iLoading.min.js";
    console.log("===========> production");
}else{
    output.filename = "iLoading.js";
    config.devServer = {
        contentBase:path.resolve(__dirname,"./demo"),
        port:9001,
        compress:true,
        noInfo:true,
        hot:true
    }
    console.log("===========> development");
}
config.output = output;
config.plugins = plugins;

module.exports = config;