const passport = require("passport");
const bcrypt = require("bcrypt");
const path = require("path");
const bodyParser = require("body-parser");
const favicon = require("express-favicon");

module.exports = (app, db) => {
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("logged in");
      next();
    } else {
      console.log("not logged in");
      res.redirect("/loginPage");
    }
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(favicon(__dirname + "/public/favicon.png"));

  app.set("view engine", "pug");

  app.get("/loginPage", function (req, res) {
    res.render(path.join(__dirname, "views", "login.pug"), {});
  });

  app.get("/invalidLogin", function (req, res) {
    res.render(path.join(__dirname, "views", "login.pug"), {
      loginMessage: "invalid input",
    });
  });

  app.get("/invalidRegister", function (req, res) {
    res.render(path.join(__dirname, "views", "login.pug"), {
      registerMessage: "username has already been taken",
    });
  });

  app.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/invalidLogin",
      successRedirect: "/profile",
    })
  );

  app.get("/logout", function (req, res) {
    req.logout();
    console.log("logout");
    res.redirect("/loginPage");
  });

  app.post(
    "/register",
    function (req, res, next) {
      db.collection("climber-profiles").findOne(
        { username: req.body.username },
        (err, user) => {
          if (err) {
            next(err);
          } else if (user) {
            console.log("username has already been taken");
            res.redirect("/invalidRegister");
          } else {
            const hash = bcrypt.hashSync(req.body.password, 12);
            db.collection("climber-profiles").insertOne(
              {
                username: req.body.username,
                password: hash,
              },
              (err, doc) => {
                if (err) {
                  res.redirect("/loginPage");
                } else {
                  console.log("new user " + req.body.username + " logged in");
                  next(null, user);
                }
              }
            );
          }
        }
      );
    },
    passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/loginPage",
    })
  );

  app.get("/profile", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

  app.use("/", ensureAuthenticated);

  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });
};
