const requireOption = require("../common/requireOption");
/**
 * Using POST params update or save a burger to the database
 * If res.locals.burger is there, it's an update otherwise this middleware creates an entity
 * Redirects to /burger after success
 */

module.exports = function (objectrepository) {
	const BurgerModel = requireOption(objectrepository, "BurgerModel");
	return function (req, res, next) {
		if (
			typeof req.body.nev === "undefined" ||
			typeof req.body.pogacsak === "undefined"
		) {
			return next();
		}
		if (typeof res.locals.burger === "undefined") {
			res.locals.burger = new BurgerModel();
		}

		res.locals.burger.nev = req.body.nev;
		res.locals.burger.pogacsak = req.body.pogacsak;
		if (req.body.csipos === "on") res.locals.burger.csipos = true;
		else res.locals.burger.csipos = false;
		if (req.body.szosz === "on") res.locals.burger.szosz = true;
		else res.locals.burger.szosz = false;
		res.locals.burger.extra = req.body.extra;

		res.locals.burger
			.save()
			.then(() => {
				console.log("Burger saved successfully");
				return res.redirect("/burger");
			})
			.catch((err) => {
				return next(err);
			});
	};
};
