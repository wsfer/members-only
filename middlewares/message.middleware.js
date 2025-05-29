/**
 * This module is used to save a one-time-use message to give users feedback on the
 * view returned on the next request (usually redirects)
 */

// Save one message to user session
async function postMessage(req, message) {
  req.session.message = message;
  await new Promise((resolve, reject) => {
    req.session.save((err) => (err ? reject(err) : resolve()));
  });
}

// Middleware to recover message on next request
async function recoverMessage(req, res, next) {
  if (req.session.message) {
    res.locals.message = req.session.message;
    delete req.session.message;
    await new Promise((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });
  }
  next();
}

module.exports = { postMessage, recoverMessage };
