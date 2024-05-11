const requireOption = require("../common/requireOption");
/**
 * Removes a guest from the database, the entity used here is: res.locals.guest
 * Redirects to /guest after delete
 */
module.exports = function (objectrepository) {
	const GuestModel = requireOption(objectrepository, "GuestModel");
	return function (req, res, next) {
		if (typeof res.locals.guest === "undefined") {
			return next();
		}

		GuestModel.deleteOne({ _id: req.params.guestid })
			.then(() => {
				console.log("Guest deleted successfully");
				return res.redirect("/guest");
			})
			.catch((err) => {
				return next(err);
			});
	};
};
