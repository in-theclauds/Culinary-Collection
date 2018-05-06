const express     = require("express");
const authRoutes  = express.Router();
const passport    = require("passport");
const User        = require("../models/user");
const flash       = require("connect-flash");
const ensureLogin = require("connect-ensure-login");
const bcrypt         = require("bcrypt");
const bcryptSalt = 10;

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
  res.render("login", { "message": req.flash("error") });
}); 
//end get login

//post login route
authRoutes.post("/login", passport.authenticate("local",
{
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: false,
  passReqToCallback: true
}
));
// end post /login


//homepage get
authRoutes.get("/user-profile", (req, res, next) => {
  res.render("user-profile");
  next();
});

// end homepage get

//google login routes
authRoutes.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

authRoutes.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/private"
}));


module.exports = authRoutes;