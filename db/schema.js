var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
//beer schema
var BeerSchema = new mongoose.Schema({
  name: {type:String, required: true},
  type: {type: String, required: true},
  seasonal: {type: Boolean, required: true},
  meta: {
    votes: Number
  },
  brewery: {type: String, required: true},
  abv: {type: Number}
});
//brewery schema
var BrewerySchema = new mongoose.Schema({
  name: {type: String, required: true},
  location: [{
    city: {type: String, required: true},
    state: {type: String, required: true}
  }],
});

//passport user schema

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserScehma.pre('save', function(cb){
  var user = this;
  if(!user.isModified('password')) return cb();

  bcrypt.genSalt(5, function(err, salt){
    if(err) return cb(err);

    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) return cb(err);
      user.password = hash;
      cb();
    });
  });
});

var UserModel = mongoose.model('User', UserSchema);
var BeerModel = mongoose.model("Beer", BeerSchema);
var BreweryModel = mongoose.model("Brewery", BrewerySchema);
