var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/e1ik75");

console.log("db.js: mongoose connected to mongodb://localhost/e1ik75");

module.exports = mongoose;
