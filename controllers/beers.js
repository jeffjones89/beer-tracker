var Beer = require('../models/beer');

exports.postBeers(function(req, res){
  var beer = new Beer();
  //properties from post request
  beer.name = req.body.name;
  beer.type = req.body.type;

  //save beer + check for errors
  beer.save(function(err){
    if(err)
      res.send(err);

    res.json({message: 'Beer added!', data: beer});
  });
});
