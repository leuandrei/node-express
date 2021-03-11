const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const bars = require('express-handlebars');
const members = require('./Members');

const app = express();

// Init middleware
// app.use(logger);

// Handlebars middleware
app.engine('handlebars', bars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => res.render('index', {title: 'Member App', members}));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
