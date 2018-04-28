const mongoose = require ('mongoose');

let Schema = mongoose.Schema;

const RestaurantSchema = new mongoose.Schema({
name: String,
websiteURL: String,
address: String,
photos: String,
User:{
  type: String,
  ref: 'users'
}

});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant
