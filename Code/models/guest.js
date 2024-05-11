const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Guest = db.model("Guest", {
	nev: String,
	erkezes: Number,
	_assignedto: {
		type: Schema.Types.ObjectId,
		ref: "Burger",
	},
});

module.exports = Guest;
