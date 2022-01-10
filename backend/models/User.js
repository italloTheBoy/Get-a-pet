const { model, Schema } = require('../database/db')


const UserSchema = new Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true },
  phone:    { type: String, required: true },
  password: { type: String, required: true },
  image:    { type: String, }

}, { timestamps: true })

const User = model('users', UserSchema)


module.exports = User