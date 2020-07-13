const mongoose = require('mongoose')

const Schema = mongoose.Schema

let CalendarSchema = new Schema({
  id: { type: Number, required: true, unique: true},
  title: { type: String, required: true },
  start: { type: String, required: true},
  end: { type: String, required: false}
}, { versionKey : false})

let CalendarModel = mongoose.model('Calendars', CalendarSchema)

module.exports = CalendarModel
