const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// mongoose.connect('mongodb://localhost/recipeApp')
//   .then(() => {
//     console.log('Connected to Mongo!')
//   }).catch(err => {
//     console.error('Error connecting to mongo', err)
//   });

// const Schema   = mongoose.Schema;

const recipeSchema = new Schema({
  title : String,
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    default: "Easy Peasy"
  },
  ingredients: [],
  cuisine: String,
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
    default: "Dish"
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg" 
  },
  duration: String,
  creator: String,
  created: {
    type: Date,
    default: Date.now()
  },

});

const Recipe = mongoose.model("Recipe", recipeSchema)



module.exports = Recipe;
