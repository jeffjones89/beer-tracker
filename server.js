var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');
var breweryController = require('./controllers/brewery');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');
var path = require('path');



//production or local port
var port = process.env.PORT || 3000;
//connect to mongoose DB

mongoose.connect('mongodb://localhost:27017/ratebeers');
var app = express();
// body-parser for Post/put
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/", express.static(path.join(__dirname + "/client")));
//initialize passport
app.use(passport.initialize());
//instantiating express router
var router = express.Router();

//serving Angular Index page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//routing for API calls below
router.route('/beers')
  .get(authController.isAuthenticated, beerController.getBeers);
//individual beer routing
router.route('/beers/:beer_id')
  .get(beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);
//routing for breweries
router.route('/breweries')
  .post(authController.isAuthenticated, breweryController.postBreweries)
  .get(breweryController.getBreweries);
router.route('/breweries/:brewery_id')
  .post(authController.isAuthenticated, breweryController.addBeer)
  .get(breweryController.getBrewery)
  .put(authController.isAuthenticated, breweryController.putBrewery)
  .delete(authController.isAuthenticated, breweryController.deleteBrewery);
//user routing
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);

app.use('/api', router);

app.listen(port);
console.log('Rating beers on port ' + port);
