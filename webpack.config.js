var path = require('path');

module.exports = {
    entry: './src/nuclear.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '*']
    },
    devtool: 'source-map'
};