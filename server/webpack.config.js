const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {RunScriptWebpackPlugin} = require('run-script-webpack-plugin');

const isProduction = typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? 'source-map' : 'inline-source-map';
module.exports = {
    entry: [
        'webpack/hot/poll?100',
        './src/main.ts',
    ],
    optimization: {
        minimize: false,
    },
    target: 'node',
    mode,
    devtool,
    externals: [
        nodeExternals({
            allowlist: ['webpack/hot/poll?100'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                },
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@dto": path.resolve(__dirname, "src/api/dto"),
            "@wrappers": path.resolve(__dirname, "src/api/wrappers"),
            "@repos": path.resolve(__dirname, "src/api/repos"),
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.WatchIgnorePlugin({
            paths: [/\.js$/, /\.d\.ts$/],
        }),
        new ForkTsCheckerWebpackPlugin(),
        !isProduction && new RunScriptWebpackPlugin({
            name: "main.js",
            autoRestart: false,
        }),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "main.js",
    }
};
