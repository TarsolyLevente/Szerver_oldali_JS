/**
 * Load a guest from the database using the :guestid param
 * The result is saved to res.locals.guest
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    res.locals.guest = {
      _id: 0,
      nev: "Gipsz Jakab",
      erkezes: 4,
      burger: 0
    };
  return next();
};
};
