const pool = require('../config/pool');
const expressSession = require('express-session');
const crypto = require('crypto');
const pgSession = require('connect-pg-simple')(expressSession);

const randomSecret = crypto.randomBytes(48).toString('hex');
const store = new pgSession({ pool: pool, createTableIfMissing: true });

module.exports = expressSession({
  store: store,
  secret: randomSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 6 * 60 * 60 * 1000, // 6 hour
  },
});
