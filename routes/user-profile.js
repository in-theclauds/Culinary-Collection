const express = require('express');
const router  = express.Router();


router.get('/user-profile', (req, res, next) => {
  console.log("userrrrrrr")
  res.render('user-profile');
});

module.exports = router;