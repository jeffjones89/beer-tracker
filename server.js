var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var hash = require('bcrypt-nodejs');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var beerController = require('./controllers/beer');
var breweryController = require('./controllers/brewery');
var userController = require('./controllers/user');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;
var User = require('./models/user');
var path = require('path');
//production or local port
var port = process.env.PORT || 3000;
//connect to mongoose DB

mongoose.connect('mongodb://localhost:27017/ratebeers');
var app = express();
// body-parser for Post/put
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use("/", express.static(path.join(__dirname + "/client")));
//initialize passport
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//instantiating express router
var router = express.Router();

//serving Angular Index page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//routing for API calls below
router.route('/beers')
  .get(beerController.getBeers);
//individual beer routing
router.route('/beers/:beer_id')
  .get(beerController.getBeer)
  .put(beerController.putBeer)
  .delete(beerController.deleteBeer);
//routing for breweries
router.route('/breweries')
  .post(breweryController.postBreweries)
  .get(breweryController.getBreweries);
router.route('/breweries/:brewery_id')
  .post(breweryController.addBeer)
  .get(breweryController.getBrewery)
  .put(breweryController.putBrewery)
  .delete(breweryController.deleteBrewery);
//user routing
app.use('/api', router);
//instantiating user router
var userRoutes = require('./controllers/user.js');
app.use('/user/', userRoutes);

// error hndlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

app.listen(port);
console.log('Rating beers on port ' + port);

module.exports = app;
