// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/practice')

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  age: Number,
})

module.exports = mongoose.model('User', UserSchema)
