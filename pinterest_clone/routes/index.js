var express = require('express')
var router = express.Router()

const upload = require('../routes/multer')
const userModel = require('../routes/users')
const postModel = require('../routes/posts')
const passport = require('passport')
const localStrategy = require('passport-local')
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Register' })
})
router.get('/login', function (req, res, next) {
  res.render('login', { error: req.flash('error') })
})
router.get('/feed', function (req, res, next) {
  res.render('feed')
})

router.get('/profile', isLoggedIn, async function (req, res) {
  const user = await userModel
    .findOne({
      username: req.session.passport.user,
    })
    .populate('posts')

  res.render('profile', { user })
})

router.post('/register', function (req, res) {
  const { username, email, full_name } = req.body

  const userData = new userModel({
    username,
    email,
    full_name,
  })
  // can do it this way aswell
  // const userData = new userModel({
  //   username: req.body.username,
  //   email: req.body.email,
  //   full_name: req.body.full_name,
  // })

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate('local')(req, res, function () {
      res.redirect('/profile')
    })
  })
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
  }),
  function (req, res) {}
)

router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

router.post(
  '/upload',
  isLoggedIn,
  upload.single('file'),
  async function (req, res, next) {
    if (!req.file) {
      return res.status(400).send('No files were uploaded')
    }

    const user = await userModel.findOne({
      username: req.session.passport.user,
    })

    const post = await postModel.create({
      title: req.body.fileCaption,
      image: req.file.filename,
      user: user._id,
    })

    await user.posts.push(post._id)
    user.save()
    res.redirect('/profile')
  }
)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}

module.exports = router
