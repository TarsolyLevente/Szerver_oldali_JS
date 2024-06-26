const requireOption = require("../common/requireOption");
/**
 * Load a guest from the database using the :guestid param
 * The result is saved to res.locals.guest
 */
module.exports = function (objectrepository) {
	const GuestModel = requireOption(objectrepository, "GuestModel");
	return function (req, res, next) {
		GuestModel.findOne({ _id: req.params.guestid })
			.populate("_assignedto")
			.then((guest) => {
				if (!guest) {
					const err = new Error("Guest not found");
					return Promise.reject(err);
				}

				res.locals.guest = guest;
				return next();
			})
			.catch((err) => next(err));
	};
};
