const express = require('express');
const path = require('path');

//Model
const members = require('./model/members.model');
//Routes
const memberRoute = require('./routes/members.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//home route
app.get('/', (req, res) => {
    res.render('index', { title: "Members List", members });
});

//members routes
app.use('/api/members', memberRoute);

app.listen(3000, () => console.log(`Server is running on port 3000`));