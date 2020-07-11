const bodyParser = require("body-parser");
const express = require("express");
const auth = require("./routes/auth.js");
const session = require("express-session");
const mongo = require("mongodb").MongoClient;
const app = express();
const loginRoutes = require("./loginRouter.js");

const FAKE_SECRET = "dfhkeofaiohfa";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: FAKE_SECRET,
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
