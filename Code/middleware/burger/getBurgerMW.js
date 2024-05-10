/**
 * Load a burger from the database using the :burgerid param
 * The result is saved to res.locals.burger
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    res.locals.burger = {
      _id: 0,
      nev: "Dupla húsos",
      pogacsak: 2,
      csipos: false,
      szosz: false,
      extra: "",
    };
    return next();
  };
};
