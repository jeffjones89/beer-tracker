var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');
var breweryController = require('./controllers/brewery');



//production or local port
var port = process.env.PORT || 3000;
//connect to mongoose DB

mongoose.connect('mongodb://localhost:27017/ratebeers');
var app = express();
// body-parser for Post/put
app.use(bodyParser.urlencoded({
  extended: true
}));
//instantiating express router
var router = express.Router();

//routing for collection API
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
  .get(breweryController.getBrewery)
  .put(breweryController.putBrewery)
  .delete(breweryController.deleteBrewery);
router.route('/breweries/:brewery_id/beers')
  .post(breweryController.addBeer);

app.use('/api', router);

app.listen(port);
console.log('Rating beers on port ' + port);
