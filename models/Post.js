const { model, Schema, SchemaType } = require('mongoose');

const postSchema = new Schema({
  body: {
    type: String,
    require: true
  },
  username: {
    type: String,
    default: null
  },
  comments: [
    {
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'

  }
}, {
  timestamps: true
})

module.exports = model('Post', postSchema)