require("../db/schema");
var mongoose = require('mongoose');

var BreweryModel = mongoose.model("Brewery");

module.exports = BreweryModel;
