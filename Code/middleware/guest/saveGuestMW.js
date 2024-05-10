/**
 * Using POST params update or save a guest to the database
 * If res.locals.guest is there, it's an update otherwise this middleware creates an entity
 * Redirects to /guest after success
 */

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (typeof req.body.nev === "undefined") {
      return next();
    }
    console.log("saveGuestMW");
    console.log(req.body);
    res.redirect("/guest");
  };
};
