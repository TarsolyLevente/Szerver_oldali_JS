/**
 * Using POST params update or save a burger to the database
 * If res.locals.burger is there, it's an update otherwise this middleware creates an entity
 * Redirects to /burger after success
 */

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof req.body.nev === "undefined") {
      return next();
    }
    console.log("saveBurgerMW");
    console.log(req.body);
    res.redirect("/burger");
  };
};
