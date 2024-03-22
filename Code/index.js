const express = require("express");
const app = express();

app.use(express.static("static"));

// Load routing
require("./route/routes")(app);

app.listen(3000, () => {
  console.log("Listening @ 3000");
});
