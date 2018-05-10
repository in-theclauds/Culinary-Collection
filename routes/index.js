const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


//Heruko + mlab instruction
// this is to export a collection from a local BD : mongoexport --db culinary-collection -c recipes -o recipes.json

mongo ds119660.mlab.com:19660/heroku_f2s7zl7l 
// this is to import a collection to  heroku BD : 
mongoimport -h ds119660.mlab.com:19660 -d heroku_f2s7zl7l -c recipes -u heroku_f2s7zl7l -p gf6p9f1j8u4969vupon409g1pd --file recipes.json

mongoimport -h ds119660.mlab.com:19660 -d heroku_f2s7zl7l -c <collection> -u <user> -p <password> --file <input file>



module.exports = router;
