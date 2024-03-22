/**
 * Load a guest from the database using the :guestid param
 * The result is saved to res.locals.guest
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    return next();
  };
};
