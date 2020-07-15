const express = require("express");
const app = express();
const session = require("express-session");
const mongo = require("mongodb").MongoClient;
const loginRoutes = require("./loginRouter.js");
const auth = require("./routes/auth.js");

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

      app.get("/heartbeat", function (req, res) {
        res.send("<3 <3");
      });

      auth(app, db);
      loginRoutes(app, db);

      app.use(function (req, res, next) {
        res.status(404).type("text").send("Not Found");
      });

      app.listen(process.env.PORT || 3000, () =>
        console.log("Server is running...")
      );
    }
  }
);
