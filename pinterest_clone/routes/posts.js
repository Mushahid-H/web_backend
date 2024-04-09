const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: {
    type: Array,
    default: [],
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Post', postSchema)
