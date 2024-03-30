const express = require('express')

const app = express()
// always runs when the server is started/restarted to go to any route

app.use((req, res, next) => {
  console.log('I am a middleware')

  next() // to go to the next middleware or route
})

app.get('/', (req, res) => {
  res.send('Hello Express JS learner!')
})

app.get('/profile', (req, res) => {
  res.send('This is the profile page')
})

// Dynamic routes
// example:
//  facebook.com/profile/John
//  facebook.com/profile/Smith
//  facebook.com/profile/Anna
// to detemine which user is being accessed we either make different routes for each of them which is not a good approach or we use dynamic routing through the simple use of ":variable_name" after the route name
// the variable name can be anything and is called params
// we can access the value of the variable by using req.params.variable_name
app.get('/profile/:user', (req, res) => {
  res.send(`Welcome to the profile of ${req.params.user}!`)
})

app.listen(3000)
