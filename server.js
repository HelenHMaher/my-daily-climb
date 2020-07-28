const express = require("express");
const app = express();
const session = require("express-session");
const mongo = require("mongodb").MongoClient;
const loginRouter = require("./loginRouter.js");
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
      loginRouter(app, db);

      app.listen(process.env.PORT || 3000, () =>
        console.log("Server is running...")
      );
    }
  }
);
