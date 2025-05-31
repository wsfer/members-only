/**
 * Collection of middlewares to test user authorization
 * These functions follow the behaviour:
 *   1. if user is not logged in redirect to login page
 *   2. if user is logged in but not allowed to view content give 403 http code
 *   3. if everything is okay pass the request to next middleware
 */

function isLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).redirect('/user/login');
  }
  next();
}

function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).redirect('/user/login');
  } else if (!req.user.is_admin) {
    return res.status(403).end();
  }
  next();
}

function isMember(req, res, next) {
  if (!req.user) {
    return res.status(401).redirect('/user/login');
  } else if (!req.user.is_member || !req.user.is_admin) {
    return res.status(403).end();
  }
  next();
}

module.exports = { isLoggedIn, isAdmin, isMember };
