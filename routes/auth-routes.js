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
  next();
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


    const newUser = new User({
      username:username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

//get login

authRoutes.get("/login", (req, res, next) => {
  res.redirect("/", { "message": req.flash("error") });
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

//user profile
authRoutes.get("/user-profile", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("user-profile", { user: req.user });
  next();
});

//subtmit a recipe
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
  res.render("recipes", { recipe: req.recipe });
  find()
  .then((recipes) => {
    res.json(recipes);
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