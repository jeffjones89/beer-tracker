var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');
//beer schema
var BeerSchema = new mongoose.Schema({
  name: {type:String, required: true},
  type: {type: String, required: true},
  seasonal: {type: Boolean, required: true},
  meta: {
    votes: Number
  },
  brewery: {type: String, required: true},
  abv: {type: Number},
  userId: {type: String, required: true}
});
//brewery schema
var BrewerySchema = new mongoose.Schema({
  name: {type: String, required: true},
  location: [{
    city: {type: String, required: true},
    state: {type: String, required: true}
  }],
});
var BeerModel = mongoose.model("Beer", BeerSchema);
var BreweryModel = mongoose.model("Brewery", BrewerySchema);
