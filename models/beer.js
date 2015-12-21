require("../db/schema");
var mongoose = require('mongoose');

var BeerModel = mongoose.model("Beer");
module.exports = BeerModel;
