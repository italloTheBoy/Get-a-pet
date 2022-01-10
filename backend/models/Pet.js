const { model, Schema } = require('../database/db')


const PetSchema = new Schema({
  name:    { type: String,  required: true },
  age:     { type: Number,  required: true },
  weight:  { type: Number,  required: true },
  color:   { type: String,  required: true },
  images:  { type: Array,   required: true },

  avalibe: { type: Boolean, default:  true },

  user:    Object,
  adopter: Object,

}, { timestamps: true })

const Pet = model('pets', PetSchema)


module.exports = Pet