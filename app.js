const express = require('express');
const passport = require('./config/passport');
const session = require('./middlewares/session.middleware');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session);
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/user', userRouter);
app.use('/', postRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
