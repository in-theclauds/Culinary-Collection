const express     = require("express");
const authRoutes  = express.Router();
const passport    = require("passport");
const User        = require("../models/user");
const flash       = require("connect-flash");
const ensureLogin = require("connect-ensure-login");
const bcrypt         = require("bcrypt");
const bcryptSalt = 10;
const Recipe      = require('../models/recipes');

authRoutes.get("/signup", (req, res, next) => {
  res.render("signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("signup", { message: `Please indicate username and password` });
    return;
  }

  User.findOne({ username:username }, "username", (err, user) => {
    if (user !== null) {
      res.render("signup", { 
        message: "Oops, Looks like that username already exists" 
      });
      return
    }
   
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
      
    User.create({username:username, password:hashPass})
    .then((theUser) => {
      res.redirect('/')
    })
    .catch((err)=>{
      console.log(err);
    })
  });
});

//get login

authRoutes.get("/login", (req, res, next) => {
  res.redirect("/");
}); 
//end get login

//post login route
authRoutes.post("/user-login", passport.authenticate("local",
{
  successRedirect: "/user-profile",
  failureRedirect: "/",
  failureFlash: false,
  passReqToCallback: true
}
));
// end post /login

//user profile GETTING AN ERROR
authRoutes.get("/user-profile", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("user-profile", { user: req.user });
  next();
});

//submit a recipe _____needs to redirect to page with all recipes
authRoutes.get("/submit-recipe", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("submitRecipe", { user: req.user });
  // next();
});

authRoutes.post('/post/submit-recipe', (req, res, next) =>{
  Recipe.create({
    recipeName: req.body.theName,
    ingredients: req.body.theIngredient,
    cuisine: req.body.theCuisine,
    duration: req.body.theDuration,
    level: req.body.level,
    dishType: req.body.dishType,
    instructions: req.body.theInstructions
  })
  .then((theRecipe) => {
    // res.json(theRecipe);
    console.log(theRecipe);
    res.render('recipes', theRecipe);
  })
  .catch((err)=>{
    console.log(err);
      next(err);
  })  
})// end post characters/create route

//All recipes
authRoutes.get("/recipes", ensureLogin.ensureLoggedIn(), (req, res, next) => {
Recipe.find()
  .then((recipes) => {
    res.render("recipes", { recipes: recipes});
    // res.json(recipes);
  })
  .catch((err)=>{
    console.log(err);
      next(err);
  })

});




// end homepage get

//google login routes
authRoutes.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

authRoutes.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/user-profile"
}));


authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;