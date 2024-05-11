const requireOption = require("../common/requireOption");
/**
 * Using POST params update or save a guest to the database
 * If res.locals.guest is there, it's an update otherwise this middleware creates an entity
 * Redirects to /guest after success
 */

module.exports = function (objectrepository) {
	const GuestModel = requireOption(objectrepository, "GuestModel");
	return function (req, res, next) {
		if (
			typeof req.body.nev === "undefined" ||
			typeof req.body.erkezes === "undefined" ||
			typeof req.body._assignedto === "undefined"
		) {
			return next();
		}
		if (typeof res.locals.guest === "undefined") {
			res.locals.guest = new GuestModel();
		}

		res.locals.guest.nev = req.body.nev;
		res.locals.guest.erkezes = req.body.erkezes;
		res.locals.guest._assignedto = req.body._assignedto;

		res.locals.guest
			.save()
			.then(() => {
				console.log("Guest saved successfully");
				return res.redirect("/guest");
			})
			.catch((err) => {
				return next(err);
			});
	};
};
