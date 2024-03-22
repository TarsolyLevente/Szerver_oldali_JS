/**
 * Removes a guest from the database, the entity used here is: res.locals.guest
 * Redirects to /guest after delete
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    return next();
  };
};
