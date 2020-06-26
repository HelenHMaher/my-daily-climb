const express = require("express");
const favicon = require("express-favicon");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
//const apiRoutes = require("./routes/api.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(favicon(__dirname + "/build/favicon.png"));
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, "build")));
app.get("/heartbeat", function (req, res) {
  res.send("<3");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//apiRoutes(app);

app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
