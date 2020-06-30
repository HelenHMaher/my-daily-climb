const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    db.collection("my-daily-climb").findOne(
      { _id: new ObjectID(id) },
      (err, doc) => {
        done(null, doc);
      }
    );
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      db.collection("my-daily-climb").findOne(
        { username: username },
        (err, user) => {
          console.log("User " + username + " attempted to log in.");
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
          }
          return done(null, user);
        }
      );
    })
  );
};
