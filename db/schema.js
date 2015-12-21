var mongoose = require('mongoose');
var BeerSchema = new mongoose.Schema({
  name: String,
  type: String,
  seasonal: Boolean,
  meta: {
    votes: Number
  },
});

var BrewerySchema = new mongoose.Schema({
  name: String,
  location: [{
    city: String,
    state: String
  }],
  beers: [BeerSchema]
});

var BeerModel = mongoose.model("Beer", BeerSchema);
var BreweryModel = mongoose.model("Brewery", BrewerySchema);
