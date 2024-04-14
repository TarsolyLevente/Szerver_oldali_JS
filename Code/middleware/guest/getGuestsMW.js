/**
 * Load all guest from the database
 * The result is saved to res.locals.guests
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    res.locals.guests = [
      {
        _id: 0,
        nev: "Gipsz Jakab",
        erkezes: 4,
        burger: 0
      },
      {
        _id: 1,
        nev: "Kovács Béla",
        erkezes: 2,
        burger: 1
      }
    ]
    return next();
  };
};
