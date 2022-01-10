const mongoose = require('mongoose')
require('dotenv').config()


async function connect (uri) {

  try {
    await mongoose.connect(uri)
  }
  catch (err) {
    console.error(err)
  }

}

connect(process.env.MONGODB_URI)


module.exports = mongoose