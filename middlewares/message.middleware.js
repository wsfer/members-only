/**
 * This module is used to save a one-time-use message to give users feedback on the
 * view returned on the next request (usually redirects)
 */

const EXPECTED_MESSAGES_TYPES = ['success', 'alert', 'failure'];

// Save one message to user session
async function postMessage(req, message, messageType = 'alert') {
  if (!EXPECTED_MESSAGES_TYPES.includes(messageType)) {
    throw new Error('Unexpected message type given message middleware');
  }

  req.session.message = message;
  req.session.messageType = messageType;

  await new Promise((resolve, reject) => {
    req.session.save((err) => (err ? reject(err) : resolve()));
  });
}

// Middleware to recover message on next request
async function recoverMessage(req, res, next) {
  if (req.session.message) {
    res.locals.message = req.session.message;
    res.locals.messageType = req.session.messageType;

    delete req.session.message;
    delete req.session.messageType;

    await new Promise((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });
  }
  next();
}

module.exports = { postMessage, recoverMessage };
