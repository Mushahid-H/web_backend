var express = require('express')
const passport = require('passport')
const userModel = require('../routes/users')
var router = express.Router()

const localStrategy = require('passport-local')
passport.use(new localStrategy(userModel.authenticate()))

router.post('/register', function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    password: req.body.password,
  })
  userModel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile')
      })
    })
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Register' })
})
router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('profile', { title: 'Mushahid' })
})
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
  function (req, res) {}
)
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

module.exports = router
