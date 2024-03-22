/**
 * Removes a burger from the database, the entity used here is: res.locals.burger
 * Redirects to /burger after delete
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    return next();
  };
};
