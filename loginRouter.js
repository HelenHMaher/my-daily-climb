const passport = require("passport");
const bcrypt = require("bcrypt");
const path = require("path");
const bodyParser = require("body-parser");
const favicon = require("express-favicon");
const express = require("express");

module.exports = (app, db) => {
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("authenticated");
      next();
    } else {
      console.log("not logged in");
      res.redirect("/loginPage");
    }
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set("view engine", "pug");

  app.use(favicon(__dirname + "/public/favicon.png"));

  app.get("/loginPage", function (req, res) {
    res.render(process.cwd() + "/views/login.pug", {});
  });

  app.route("/login").post(function (req, res) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        console.log(err);
      }
      if (!user) {
        console.log(info);
        res.render(process.cwd() + path.join(__dirname, "build", "login.pug"), {
          loginMessage: "invalid login",
        });
      }
      console.log("got user");
      res.redirect("/profile");
    });
  });

  app.route("/logout").get(function (req, res) {
    req.logout();
    console.log("logout");
    res.redirect("/loginPage");
  });

  app.route("/register").post((req, res, next) => {
    db.collection("my-daily-climb").findOne(
      { username: req.body.username },
      (err, user) => {
        if (err) {
          next(err);
        } else if (user) {
          console.log("username has already been taken");
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
                console.log("new user logged in");
                next(null, user);
              }
            }
          );
        }
      }
    );
  }, passport.authenticate("local", { successRedirect: "/profile", failureRedirect: "/loginPage" }));

  app.use(
    "/",
    ensureAuthenticated,
    express.static(path.join(__dirname, "build"))
  );

  app.get("/profile", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });
};
