module.exports = function(app) {
  return {
    index: function (req, res, next) {
      json.test = 'hi';
      app.renderer('test', res, json);
    }
  }
}
