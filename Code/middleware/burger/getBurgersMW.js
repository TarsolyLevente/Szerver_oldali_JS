/**
 * Load all burger from the database
 * The result is saved to res.locals.burgers
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    res.locals.burgers = [
      {
        _id: 0,
        nev: "Dupla húsos",
        pogacsak: 2,
        csipos: false,
        szosz: false,
        extra: "",
      },
      {
        _id: 1,
        nev: "Csípős hamburger szószos",
        pogacsak: 1,
        csipos: true,
        szosz: true,
        extra: "",
      },
    ];
    return next();
  };
};
