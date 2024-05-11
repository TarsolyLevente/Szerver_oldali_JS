const requireOption = require("../common/requireOption");
/**
 * Load a burger from the database using the :burgerid param
 * The result is saved to res.locals.burger
 */
module.exports = function (objectrepository) {
	const BurgerModel = requireOption(objectrepository, "BurgerModel");
	return function (req, res, next) {
		BurgerModel.findOne({ _id: req.params.burgerid })
			.then((burger) => {
				if (!burger) {
					return next(new Error("Burger not found"));
				}

				res.locals.burger = burger;
				return next();
			})
			.catch((err) => next(err));
	};
};
