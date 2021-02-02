const TerserPlugin = require('terser-webpack-plugin')
const isProduction = process.env.NODE_ENV !== 'development'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: './',
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
          })
        ]
      }
    }
  },
  configureWebpack: (config) => {
    if (isProduction) {
      const productionGzipExtensions = ['html', 'js', 'css']
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      )
      config.optimization = {
        usedExports: true,
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: 'all',
              test: /node_modules/,
              name: 'vendor',
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100,
              reuseExistingChunk: true
            },
            common: {
              chunks: 'all',
              test: /[\\/]src[\\/]js[\\/]/,
              name: 'common',
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60,
              reuseExistingChunk: true
            },
            styles: {
              name: 'styles',
              test: /\.(sa|sc|c)ss$/,
              chunks: 'all',
              enforce: true
            },
            runtimeChunk: {
              name: 'manifest'
            }
          }
        },
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log']
              }
            }
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    // 打包分析工具
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
}
