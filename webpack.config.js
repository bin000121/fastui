const path = require('path')
module.exports = {
    resolve: {
        extensions: ['.ts', '.js', '.json', '.vue'],
        root: path.resolve(__dirname),
        alias: {
            '@': path.join(__dirname, './src')
        }
    }
}
