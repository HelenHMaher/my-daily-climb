const express = require("express");
const favicon = require("express-favicon");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(favicon(__dirname + "/build/HMlogo.gif"));
app.use("/my-daily-climb/", express.static(path.join(__dirname, "build")));
app.get("/heartbeath", function (req, res) {
  res.send("<3");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
