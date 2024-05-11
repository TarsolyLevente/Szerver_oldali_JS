const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Burger = db.model("Burger", {
	nev: String,
	pogacsak: Number,
	csipos: Boolean,
	szosz: Boolean,
	extra: String,
});

module.exports = Burger;
