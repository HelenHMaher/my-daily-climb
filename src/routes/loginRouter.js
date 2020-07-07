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

  // define the first route
  app.route("/heartbeat").get(function (req, res) {
    res.send("<3");
  });

  app.use("/", ensureAuthenticated, function (req, res) {
    res.sendFile("/public/index.html");
  });

  app.use("/loginPage", function (req, res) {
    res.sendFile("/public/login.html");
  });

  app.route("/login").post(
    passport.authenticate("local", {
      failureRedirect: "/loginPage",
    }),
    (req, res, next) => {
      res.redirect("/");
    }
  );

  app.route("/logout").get(function (req, res) {
    req.logout();
    console.log("logout");
    res.redirect("/loginPage");
  });

  app.route("/register").post(
    (req, res, next) => {
      db.collection("my-daily-climb").findOne(
        { username: req.body.username },
        (err, user) => {
          if (err) {
            next(err);
          } else if (user) {
            res.redirect("/loginPage");
          } else {
            const hash = bcrypt.hashSync(req.body.password, 12);
            db.collection("my-daily-climb").insertOne(
              {
                username: req.body.username,
                password: hash,
              },
              (err, doc) => {
                if (err) {
                  res.redirect("/loginPage");
                } else {
                  next(null, user);
                }
              }
            );
          }
        }
      );
    },
    passport.authenticate("local", { failureRedirect: "/loginPage" }),
    (req, res, next) => {
      res.redirect("/");
    }
  );

  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });
};
