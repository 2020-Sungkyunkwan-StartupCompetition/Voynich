module.exports = {
  devServer: {
    Host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://www.voynich.link/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  outputDir: '../Voynich_backend/public'
};