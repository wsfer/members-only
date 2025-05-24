const pool = require('../config/pool');
const expressSession = require('express-session');
const crypto = require('crypto');
const pgSession = require('connect-pg-simple')(expressSession);

const store = new pgSession({ pool: pool, createTableIfMissing: true });
const sessionSecret =
  process.env.SESSION_SECRET || crypto.randomBytes(48).toString('hex');

module.exports = expressSession({
  store: store,
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 6 * 60 * 60 * 1000, // 6 hour
  },
});
