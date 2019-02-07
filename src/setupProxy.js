const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/socket', {
      // If running WebJive outside of Docker, use ws://localhost:5004, if it's inside Docker substitute the TangoGql container name ws://<tgql container name>:5004
      target: 'ws://localhost:5004',
      secure: false,
      changeOrigin: true,
      ws: true
    })
  );
  app.use(
    proxy('/db', {
      // If running WebJive outside of Docker, use http://localhost:5004, if it's inside Docker substitute the TangoGql container name http://<tgql container name>:5004
      target: 'http://localhost:5004',
      secure: false,
      changeOrigin: true
    })
  );
};
