const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static("static"));
// Load routing
require("./route/routes")(app);

app.use((err, req, res, next) => {
	res.status(500).send("Error: " + err);
	console.log(err);
});

app.listen(3000, () => {
  console.log("Listening @ 3000");
});
/*const Burger = require("./models/burger");
const Guest = require("./models/guest");
let burger = new Burger({
	nev: "Dupla húsos",
	pogacsak: 2,
	csipos: false,
	szosz: false,
	extra: "",
});
burger
	.save()
	.then(() => {
		console.log("Burger saved successfully");
		let guest = new Guest({
			nev: "Gipsz Jakab",
			erkezes: 4,
			_assignedto: burger._id,
		});
		return guest.save();
	})
	.then(() => {
		console.log("Guest saved successfully");
	})
	.catch((err) => {
		console.log(err);
	});*/
