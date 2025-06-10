const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userQueries = require('../database/user.queries');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userQueries.getByUsername(username);

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.account_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userQueries.getById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
