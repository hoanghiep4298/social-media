const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})

userSchema.index({ username: 1 }, { unique: true })

module.exports = model('User', userSchema)