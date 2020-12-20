const TerserPlugin = require('terser-webpack-plugin');
//  const isProduction = process.env.VUE_APP_CURRENTMODE !== 'development';
console.log(process.env.NODE_ENV) 
module.exports = {
  lintOnSave: false,
  // productionSourceMap:false,
  publicPath: './',
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require("autoprefixer")({
            overrideBrowserslist: ["last 15 versions"]
          }),
        ]
      }
    }
  },
  // configureWebpack: (config) => {
  //   if (isProduction) {
  //     config.optimization = {
  //       splitChunks: {
  //         cacheGroups: {
  //           common: {
  //             chunks: 'initial',
  //             minSize: 0, 
  //             minChunks: 2, 
  //           },
  //           vendor: {
  //             priority: 1, 
  //             test: /node_modules/,
  //             chunks: 'initial',
  //             minSize: 0, 
  //             minChunks: 2, 
  //           },
  //         },
  //       },
  //       minimizer: [
  //         new TerserPlugin({
  //           terserOptions: {
  //             ecma: undefined,
  //             warnings: false,
  //             parse: {},
  //             compress: {
  //               drop_console: true,
  //               drop_debugger: false,
  //               pure_funcs: ['console.log'],
  //             },
  //           },
  //         }),
  //       ]
         
        
  //     }
  //   }
  // }
};