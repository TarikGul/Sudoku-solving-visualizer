const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env']
                    }
                },
            }
        ]
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: [".js", "*"]
    }
};
//https://bost.ocks.org/mike/bubble-map/