const { recoverMessage } = require('./middlewares/message.middleware');
const express = require('express');
const passport = require('./config/passport');
const session = require('./middlewares/session.middleware');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const commentRouter = require('./routes/comment.router');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session);
app.use(passport.session());
app.use(recoverMessage);
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/user', userRouter);
app.use('/comment', commentRouter);
app.use('/', postRouter);

/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
app.use((err, req, res, _next) => {
  if (err.statusCode === 404) {
    res.status(404).render('not-found', { error: err });
  } else {
    console.error(err);
    res.status(500).send('Unexpected server error');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
