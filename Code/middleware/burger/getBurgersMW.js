const requireOption = require("../common/requireOption");
/**
 * Load all burger from the database
 * The result is saved to res.locals.burgers
 */
module.exports = function (objectrepository) {
	const BurgerModel = requireOption(objectrepository, "BurgerModel");

	return function (req, res, next) {
		BurgerModel.find({})
			.then((burgers) => {
				res.locals.burgers = burgers;
				return next();
			})
			.catch((err) => {
				return next(err);
			});
	};
};
