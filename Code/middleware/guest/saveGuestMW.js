/**
 * Using POST params update or save a guest to the database
 * If res.locals.guest is there, it's an update otherwise this middleware creates an entity
 * Redirects to /guest after success
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    return next();
  };
};
