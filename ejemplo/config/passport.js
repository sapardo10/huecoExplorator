const LocalStrategy = require('passport-local').Strategy;
const Administrator = require('../models/administrator');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
  //Local LocalStrategy
  passport.use(new LocalStrategy(function (username, password, done) {
    let query = {
      username: username,
    };
    Administrator.findOne(query, function (err, administrator) {
      if (err) {
        console.log(err);
      }

      if (!administrator) {
        return done(null, false, { message: 'No user found' });
      }

      bcrypt.compare(password, administrator.password, function (err, isMatch) {
        if (err) {
          console.log(err);
        }

        if (isMatch) {
          return done(null, administrator);
        }  else {
          return done(null, false, { message: 'Wrong password' });
        }
      });
    });
  }));

  passport.serializeUser(function (administrator, done) {
    done(null, administrator.id);
  });

  passport.deserializeUser(function (id, done) {
    Administrator.findById(id, function (err, administrator) {
      if (err) {
        console.error('There was an error accessing the records of' +
        ' user with id: ' + id);
        return console.log(err.message);
      }

      return done(null, administrator);
    });
  });
};
