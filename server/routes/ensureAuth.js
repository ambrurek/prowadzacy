const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.send('not login');
    }
  };

  module.exports = {
    ensureAuthenticated
  }