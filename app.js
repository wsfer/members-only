const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/user', userRouter);
app.get('/', (req, res) => res.render('index'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
