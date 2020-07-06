const passport = require("passport");
const bcrypt = require("bcrypt");

module.exports = (app, db) => {
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      console.log("not logged in");
      res.redirect("/");
    }
  }

  app.route("/").get(function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
  });

  // define the first route
  app.route("/heartbeat").get(function (req, res) {
    res.send("<3");
  });

  app.route("/login").post(
    passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/",
    })
  );

  app.use("/profile", ensureAuthenticated, function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
  });

  app.route("/logout").get(function (req, res) {
    req.logout();
    console.log("logout");
    res.redirect("/");
  });

  app.route("/register").post(
    (req, res, next) => {
      db.collection("my-daily-climb").findOne(
        { username: req.body.username },
        (err, user) => {
          if (err) {
            next(err);
          } else if (user) {
            res.redirect("/");
          } else {
            const hash = bcrypt.hashSync(req.body.password, 12);
            Db.collection("my-daily-climb").insertOne(
              {
                username: req.body.username,
                password: hash,
              },
              (err, doc) => {
                if (err) {
                  res.redirect("/");
                } else {
                  next(null, user);
                }
              }
            );
          }
        }
      );
    },
    passport.authenticate("local", { failureRedicret: "/" }),
    (req, res, next) => {
      res.redirect("/profile");
    }
  );

  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });
};
