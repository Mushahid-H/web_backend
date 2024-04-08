const mongoose = require('mongoose')

const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/pinterest_db')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  dp: {
    type: String,
  },
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
})

userSchema.plugin(plm)

module.exports = mongoose.model('User', userSchema)
