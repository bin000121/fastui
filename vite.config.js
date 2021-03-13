import path from 'path'

module.exports = {
    port: 1997,
    open: true,
    base: './',
    alias: {
        '/@/': path.resolve(__dirname, './src')
    },
    optimizeDeps: {
        include: ['lodash']
    }
}
