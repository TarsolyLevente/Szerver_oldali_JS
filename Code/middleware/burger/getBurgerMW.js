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
					const err = new Error("Burger not found");
					return Promise.reject(err);
				}
				res.locals.burger = burger;
				return next();
			})
			.catch((err) => {
				return next(err);
			});
	};
};
