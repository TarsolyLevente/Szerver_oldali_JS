const express = require("express");
const app = express();
app.set("view engine", "ejs")

app.use(express.static("public"));

// Load routing
require("./route/routes")(app);

app.listen(3000, () => {
  console.log("Listening @ 3000");
});
