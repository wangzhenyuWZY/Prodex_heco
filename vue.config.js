module.exports = {
  lintOnSave: false,
    css: {
      loaderOptions: {
        postcss: {
          plugins: [
            require("autoprefixer")({
              overrideBrowserslist: ["last 15 versions"] 
            }),
          ]
        }
      }
    }
  };