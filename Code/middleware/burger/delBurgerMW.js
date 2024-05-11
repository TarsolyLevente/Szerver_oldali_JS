const requireOption = require("../common/requireOption");
/**
 * Removes a burger from the database, the entity used here is: res.locals.burger
 * Redirects to /burger after delete
 */
module.exports = function (objectrepository) {
	const BurgerModel = requireOption(objectrepository, "BurgerModel");
	return function (req, res, next) {
		if (typeof res.locals.burger === "undefined") {
			return next();
		}

		BurgerModel.deleteOne({ _id: req.params.burgerid })
			.then(() => {
				console.log("Burger deleted successfully");
				return res.redirect("/burger");
			})
			.catch((err) => {
				return next(err);
			});
	};
};
