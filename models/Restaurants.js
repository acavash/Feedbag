const mongoose = require ('mongoose');

let Schema = mongoose.Schema;

const RestaurantSchema = new mongoose.Schema({
name: String,
websiteURL: String,
address: String,
photos: String,
location: String,
hours: String,
phone:String,
User:{
  type: Schema.Types.ObjectId, ref: "users"
}

});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant
