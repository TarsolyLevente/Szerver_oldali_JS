const requireOption = require("../common/requireOption");
/**
 * Load all guest from the database
 * The result is saved to res.locals.guests
 */
module.exports = function (objectrepository) {
	const GuestModel = requireOption(objectrepository, "GuestModel");

	return function (req, res, next) {
		GuestModel.find({})
			.populate("_assignedto")
			.then((guests) => {
				res.locals.guests = guests;
				//bucik szama query
				GuestModel.aggregate([
					{
						$lookup: {
							from: "burgers",
							localField: "_assignedto",
							foreignField: "_id",
							as: "assignedBurgers",
						},
					},
					{
						$match: {
							assignedBurgers: {
								$exists: true,
								$ne: [],
							},
						},
					},
					{
						$count: "numberOfGuestsWithAssignedBurgers",
					},
				])
					.then((result) => {
						res.locals.bucicnt = result[0]
							? result[0].numberOfGuestsWithAssignedBurgers
							: 0;
						//pogacsak szama query
						GuestModel.aggregate([
							{
								$lookup: {
									from: "burgers",
									localField: "_assignedto",
									foreignField: "_id",
									as: "assignedBurgers",
								},
							},
							{
								$match: {
									assignedBurgers: {
										$exists: true,
										$ne: [],
									},
								},
							},
							{
								$unwind: "$assignedBurgers",
							},
							{
								$group: {
									_id: null,
									totalPogacsak: {
										$sum: "$assignedBurgers.pogacsak",
									},
								},
							},
						])
							.then((result) => {
								res.locals.pogicnt = result[0]
									? result[0].totalPogacsak
									: 0;
								return next();
							})
							.catch((err) => {
								return next(err);
							});
					})
					.catch((err) => {
						return next(err);
					});
			})
			.catch((err) => {
				return next(err);
			});
	};
};
