function MagicCommentsPlugin(options) { 
  options = options || {};
  this.comments = options.comments;
}

MagicCommentsPlugin.prototype.apply = function(compiler) {
  var self = this;
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, cb) {
      var isArray = Array.isArray(self.comments);

      htmlPluginData.html = htmlPluginData.html.replace('</body>', function(bodyCloseTag) {
        return isArray
          ? '<script>console.log(`%c' + self.comments[0] + '`,' + `"${self.comments[1]}")</script>${bodyCloseTag}`
          : '<script>console.log(`' + self.comments + '`)</script>' + bodyCloseTag;
      })
      cb(null, htmlPluginData);
    });
  });

};

module.exports = MagicCommentsPlugin;