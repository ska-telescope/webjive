const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/socket', {
      target: 'ws://localhost:5004',
      secure: false,
      changeOrigin: true,
      ws: true
    })
  );
  app.use(
    proxy('/db', {
      target: 'http://localhost:5004',
      secure: false,
      changeOrigin: true
    })
  );
};