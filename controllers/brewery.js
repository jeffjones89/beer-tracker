var Brewery = require('../models/brewery');

exports.postBreweries = function(req, res) {
  // Create a new instance of the Beer model
  var brewery = new Brewery();

  // Set the brewery properties that came from the POST data
  brewery.name = req.body.name;
  brewery.location = {city: req.body.city, state: req.body.state};


  // Save the beer and check for errors
  brewery.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Brewery created!', data: brewery });
  });
};

exports.getBreweries = function(req, res) {
  Brewery.find(function(err, breweries) {
    if (err)
      res.send(err);

    res.json(breweries);
  });
};
exports.getBrewery = function(req, res){
  Brewery.findById(req.params.brewery_id, function(err, brewery){
      if(err)
        res.send(err);
      res.json(brewery);
  });
};

exports.putBrewery = function (req, res) {
  Brewery.findById(req.params.brewery_id, function(err, brewery){
    if (err)
      res.send(err);
    brewery.name = req.body.name;
    brewery.location = {city: req.body.city, state: req.body.state};

    brewery.save(function(err){
      if (err)
        res.send(err);
      res.json(brewery);
    });
  });
};

exports.deleteBrewery = function(req, res){
  Brewery.findByIdAndRemove(req.params.brewery_id, function(err){
    if(err)
      res.send(err);

    res.json({message: 'Brewery deleted!'});
  });
};

exports.addBeer = function(req, res){
  Brewery.findById(req.params.brewery_id, function(err, brewery){
    brewery.beers.push(new Beer({
      name: req.body.name,
      type: req.body.type,
      seasonal: req.body.seasonal
    }));

    brewery.save(function(err){
      if(err)
        res.send(err);
      res.json({message: 'Beer saved!'});
    });
  });
};
