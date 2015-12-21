var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require ('./models/beer');
var app = express();
// body-parser for Post/put
app.use(bodyParser.urlencoded({
  extended: true
}));

//production or local port
var port = process.env.PORT || 3000;
//connect to mongoose DB
mongoose.connect('mongodb://localhost:27017/ratebeers');

var router = express.Router();
router.get('/', function(req, res){
  res.json({message: 'Welcome to rate a beer!'});
});
//indexing and adding new beers
var beersRoute = router.route('/beers');

beersRoute.get(function(req, res){
  Beer.find(function(err, beers){
    if (err)
      res.send(err);

    res.json(beers);
  });
});
//individual beer API calls
var beerRoute = router.route('/beers/:beer_id');

beerRoute.get(function(req, res){
  Beer.findById(req.params.beer_id, function(err, beer){
    if(err)
      res.send(err);

    res.json(beer);
  });
});

beerRoute.put(function(req, res){
  Beer.findById(req.params.beer_id, function(err, beer){
    if(err)
      res.send(err);

      beer.name = req.body.name;
      beer.type = req.body.type;

      beer.save(function(err){
        if(err)
          res.send(err);

        res.json(beer);
      });
  });
});

beerRoute.delete(function(req, res){
  Beer.findByIdAndRemove(req.params.beer_id, function(err){
    if(err)
      res.send(err);

    res.json({message: 'Beer deleted!'});
  });
});

app.use('/api', router);

app.listen(port);
console.log('Rating beers on port ' + port);
