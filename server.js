const express = require("express");
const favicon = require("express-favicon");
const bodyParser = require("body-parser");
const app = express();
const loginRoutes = require("./routes/loginRouter.js");
const auth = require("./routes/auth.js");
const session = require("express-session");
const mongo = require("mongodb").MongoClient;
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(favicon(__dirname + "/public/favicon.png"));
app.use("/my-daily-climb/", express.static(path.join(__dirname, "build")));
app.get("/heartbeat", function (req, res) {
  res.send("<3 <3");
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

mongo.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    let db = client.db("my-daily-climb");
    if (err) {
      console.log("Database err: " + err);
    } else {
      console.log("Successful database connection");

      auth(app, db);
      //loginRoutes(app, db);

      app.use(function (req, res, next) {
        res.status(404).type("text").send("Not Found");
      });

      app.listen(process.env.PORT || 3000, () =>
        console.log("Server is running...")
      );
    }
  }
);
