const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.argv.indexOf('--production') !== -1;
const extractCss = new MiniCssExtractPlugin({
    filename: 'css/[name].style.css'
});

module.exports = {
    entry: {
        index: './src/index.tsx',
    },
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].[name].js',
        path: path.join(__dirname, 'dist/'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, './src/'),
        },
    },

    devtool: 'inline-source-map',

    devServer: {
        port: 8001,
        publicPath: '',
        progress: false,
        contentBase: './folderthatdoesnotexists',
        hot: true,
        host: '0.0.0.0',
        compress: true,
        allowedHosts: ['localhost'],
        https: true,
    },

    // Plugins
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['index'],
            minify: {
                removeComments: isProd,
                collapseWhitespace: true,
            },
        }),
        new ForkTsCheckerWebpackPlugin({
            tslint: true,
            vue: true,
            checkSyntacticErrors: false,
        }),
        extractCss,
    ],

    module: {
        rules: [
            // Style
            {
                test: /\.(sc|c)ss$/,
                exclude: /\.module.(sc|c)ss$/,
                use: [
                    !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.module.(sc|c)ss$/,
                use: [
                    !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: !isProd,
                        }
                    },
                    'sass-loader',
                ],
            },
            // Typescript files
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                use: 'source-map-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                },
            },
        ]
    },
};
