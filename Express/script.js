const express = require('express')

const app = express()

// configuring ejs
// ejs is a templating engine that allows us to embed javascript in html
// it is used to create dynamic web pages
// and we use render method to render the ejs file instead of send method
//  example: res.render('profile.ejs', {name: 'John'})

app.set('view engine', 'ejs')

// always runs when the server is started/restarted to go to any route
app.use((req, res, next) => {
  console.log('I am a middleware')

  next() // to go to the next middleware or route
})

// configuring static files
// static files are files that are not changed and are served as they are
// example: images, css, js files
// we use express.static() to serve static files
app.use(express.static('public')) // this will serve the files in the public folder

app.get('/', (req, res) => {
  // normal way
  // res.send('Hello Express JS learner!')

  // ejs template engine way

  res.render('index.ejs')
})

// using it using the render method
app.get('/contact', (req, res) => {
  res.render('contact')
})
app.get('/about', (req, res) => {
  //  we can also send dynamic data to the ejs file through render method, the data is sent as an object
  // the data can be accessed in the ejs file by using the object key
  // example: res.render('contact.ejs', {name: 'John'})
  // in the ejs file we can access
  // <h1> <%= name %> </h1> which will render the name John

  res.render('aboutus', {
    first_name: 'Gulrukh',
    second_name: 'Gulishtan',
    third_name: 'Mushahid',
  })
  //   if you don't pass data and try to access it in the ejs file, it will throw an error
})

app.get('/profile', (req, res) => {
  res.send('This is the profile page')
})

// Dynamic routes
// example:
//  facebook.com/profile/John
//  facebook.com/profile/Smith
//  facebook.com/profile/Anna
// to detemine which user is being accessed we either make different routes for each of them which is not a good approach ( if not we get error ) OR we use dynamic routing through the simple use of ":variable_name" after the route name
// the variable name can be anything and is called params
// we can access the value of the variable by using req.params.variable_name
app.get('/profile/:user', (req, res) => {
  res.send(`Welcome to the profile of ${req.params.user}!`)
})
app.get('/error', (req, res, next) => {
  throw new Error('This is an error')
})

app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

app.listen(3000)

// in every project we have to do all the earlier work to set up the server and the routes and the middlewares
// Now to avoid this we can use express generator
// express generator is a tool that generates a boilerplate code for an express project, including file structure, routes, middlewares, etc
// to install it we use the command
// npm install express-generator -g
// to generate a new project we use the command
// express project_name --view=ejs
// to install the dependencies we use the command
// npm install
