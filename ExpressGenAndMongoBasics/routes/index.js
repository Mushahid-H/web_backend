var express = require('express')
var router = express.Router()
const userModel = require('./users')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// learn sessions
// req.session.give_any_name = 'any_value'
router.get('/session', function (req, res) {
  req.session.name = 'mushy'
  req.session.ban = true
  res.send('session set')
})
router.get('/sessionget', function (req, res) {
  if (req.session.ban) {
    res.send(` ${req.session.name} You have been banned from this website`)
  } else {
    res.render('index', { title: 'Mushahid' })
  }
})
// delete session
router.get('/sessiondelete', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      throw err
    }
  })
  res.send('session deleted')
})

// create cookies

router.get('/getcookie', function (req, res) {
  res.cookie('name', 'mushy')
  res.send('cookie set')
})
// read cookies
router.get('/showcookie', function (req, res) {
  res.send(req.cookies.name)
})
// delete cookie
router.get('/deletecookie', function (req, res) {
  res.clearCookie('name')
  res.send('cookie deleted')
})

// create data
router.get('/create', async function (req, res) {
  const createUser = await userModel.create({
    username: 'mushy',
    password: 'mushtaq123',
    age: 48,
  })
  res.send(createUser)
})
//  read/find all data
router.get('/displayall', async (req, res) => {
  const data = await userModel.find()

  res.send(data)
})
// read one data
router.get('/displayone', async (req, res) => {
  const data = await userModel.findOne({ username: 'mushy' })
  res.send(data)
})

// return deleted data
router.get('/delete', async (req, res) => {
  const data = await userModel.findOneAndDelete({ username: 'mushy' })
  res.send(data)
})

// no return deleted data
router.get('/delet', async (req, res) => {
  const data = await userModel.deleteOne({ username: 'testme' })
  res.send(data)
})
module.exports = router
