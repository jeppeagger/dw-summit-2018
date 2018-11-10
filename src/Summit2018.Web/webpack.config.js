const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = [
    {
        name: 'Custom JS',
        mode: "development",
        entry: {
            'custom': './Files/Templates/Designs/Rapido/js/source/Custom.js',
            'custom.min': './Files/Templates/Designs/Rapido/js/source/Custom.js'
        },
        output: {
            path: path.resolve(__dirname, 'Files', 'Templates', 'Designs', 'Rapido', 'js'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    include: /\.min\.js$/
                })
            ]
        }
    },
    {
        name: 'Ignite LESS',
        mode: 'development',
        entry: {
            'ignite': './Files/Templates/Designs/Rapido/css/ignite/_ignite.less',
            'ignite.min': './Files/Templates/Designs/Rapido/css/ignite/_ignite.less'
        },
        output: {
            path: path.resolve(__dirname, 'Files', 'Templates', 'Designs', 'Rapido', 'css', 'ignite'),
            filename: '[name].js'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new IgnoreEmitPlugin(/\.js$/)
        ],
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [{
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader',
                        options: { sourceMap: devMode }
                    }]
                }
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.min\.css$/
                })
            ]
        }
    }
]