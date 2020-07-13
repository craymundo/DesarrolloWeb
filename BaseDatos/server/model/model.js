const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  id: { type: Number, required: true, unique: true},
  usuario: { type: String, required: true },
  password: { type: String, required: true}
}, { versionKey : false})

let UserModel = mongoose.model('Users', UserSchema)

module.exports = UserModel
