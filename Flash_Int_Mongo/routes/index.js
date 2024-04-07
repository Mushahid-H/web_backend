var express = require('express')
var router = express.Router()
const userModel = require('../routes/users')
/* GET home page. */
router.get('/', function (req, res) {
  res.render('index')
})

//  connect-flash is used to store messages in session and display it to the user,
//  it is used to display error messages to the user
//  can be used to create data in one route and use it in another route

//  first in app.use we have to require the connect-flash module, and also setup session before it
//  then we have to use it in the app.use
//  then we have to use it in the route where we want to display the message

router.get('/flash', function (req, res) {
  req.flash('info', 'Flash is back!')
  res.send('flash created bro')
})

router.get('/getflash', function (req, res) {
  res.send(req.flash('info'))
  res.send('flash displayed bro')
})

router.get('/create', async function (req, res) {
  const userData = await userModel.create({
    username: 'jesti',
    password: 'jpest',
    nickname: 'jesto',
    description: 'jesting is a pest of pester that tests what test is to test',
    category: ['jest', '', 'mongo', 'ejs'],
  })

  res.send(userData)
})

router.get('/find', async function (req, res) {
  // normal search
  const user = await userModel.find()
  res.send(user)
})

router.get('/findi', async function (req, res) {
  // case in-sensitive search

  var regex = new RegExp('Jest', 'i')
  const user = await userModel.find({ username: regex })
  res.send(user)
  // porblem here is it return every username containing the given username
})

router.get('/findr', async function (req, res) {
  var regex = new RegExp('^JeSt$', 'i')
  // ^ in regular expression means anything that starts with what comes after
  // $ means anything that ends with what comes before

  const user = await userModel.find({ username: regex })
  res.send(user)
})

// find if array in user object contains a particular value
// here we do for categories
router.get('/finda', async function (req, res) {
  const user = await userModel.find({
    category: {
      $all: ['test', ''],
      // $all means all users
    },
  })
  res.send(user)
})

// find between a date range

router.get('/findd', async function (req, res) {
  var d1 = new Date('2024-04-07')
  var d2 = new Date('2024-04-08')

  const user = await userModel.find({ dateCreated: { $gte: d1, $lte: d2 } })
  res.send(user)
})
// find on basis of whether a field exists

router.get('/finde', async function (req, res) {
  const user = await userModel.find({ category: { $exists: true } })
  res.send(user)
})
module.exports = router
