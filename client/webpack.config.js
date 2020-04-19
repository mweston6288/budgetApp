const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: {
        app: "./assets/index.js",
        db: "./assets/db.js",
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins: [
        new WebpackPwaManifest({
            name: "Budget app",
            short_name: "Budget",
            description: "An application that allows you to track income and expenses",
            background_color: "#01579b",
            theme_color: "#ffffff",
            "theme-color": "#ffffff",
            start_url: "/"
        })
    ]
};

module.exports = config;
