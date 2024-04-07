const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/intermidiate_mongo')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  nickname: String,
  description: String,
  category: {
    type: Array,
    default: [],
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
})

const User = mongoose.model('User', userSchema) // User is a model
module.exports = User
