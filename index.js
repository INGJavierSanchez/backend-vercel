const app = require('./api/server');

module.exports = (req, res) => {
  app(req, res);
};
