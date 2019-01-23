const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    proxy('/socket', {
      target: 'ws://tangogql:5004',
      secure: false,
      changeOrigin: true,
      ws: true
    })
  );
  app.use(
    proxy('/db', {
      target: 'http://tangogql:5004',
      secure: false,
      changeOrigin: true
    })
  );
};
