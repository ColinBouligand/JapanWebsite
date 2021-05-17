module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'localhost:5000',
          changeOrigin: true,
          logLevel: 'debug',
          pathRewrite: { '^/api': '/' },
        },
      },
    },
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  }
  }

