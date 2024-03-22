const express = require("express");
const app = express();

app.get;

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Listening @ 3000");
});
