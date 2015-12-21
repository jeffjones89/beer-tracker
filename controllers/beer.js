// Load required packages
var Beer = require('../models/beer');

// Create endpoint /api/beers for GET
exports.getBeers = function(req, res) {
  // Use the Beer model to find all beer
  Beer.find(function(err, beers) {
    if (err)
      res.send(err);

    res.json(beers);
  });
};

// Create endpoint /api/beers/:beer_id for GET
exports.getBeer = function(req, res) {
  // Use the Beer model to find a specific beer
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err)
      res.send(err);

    res.json(beer);
  });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putBeer = function(req, res) {
  // Use the Beer model to find a specific beer
  Beer.update(req.params.beer_id, function(err, beer) {
    if (err)
      res.send(err);

      beer.name = req.body.name;
      beer.type = req.body.type;

    beer.save(function(err) {
      if (err)
        res.send(err);

      res.json(beer);
    });
  });
};

exports.deleteBeer = function(req, res) {

  Beer.remove({userId: req.user._id, _id: req.params.beer_id } , function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Beer deleted!' });
  });
};
