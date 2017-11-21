module.exports = {
    entry: {
        index: "./js/index.js"
    },
    output: {
        filename: "[name].js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015"]
                    }
                },
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
}
