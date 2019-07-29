const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
var port = process.env.PORT || 8080;
//Configure isProduction variable

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

var userName = 'pramod';
//Configure Mongoose
mongoose.connect('mongodb+srv://' + encodeURIComponent(userName)+':eBx07bf4BNV1sM5y@cluster0-twfer.mongodb.net/sampleUserData?ssl=true&retryWrites=true&w=majority&authSource=admin', { useNewUrlParser: true });

mongoose.set('debug', true);

//Models & routes
require('./models/Users');
require('./config/passport');
app.use(require('./routes'));



app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(port, () => console.log('Server running on ', port));
