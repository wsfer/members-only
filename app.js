const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/user', userRouter);
app.use('/', postRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
