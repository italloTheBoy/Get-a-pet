const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
  destination: function ( req, file, cb ) {

    const folder = req.baseUrl.includes('pet') 
    ? 'pets'
    : 'users'

    cb(null, path.join( 'public', 'img', folder))
    
  },

  filename: ( req, file, cb ) => {
    cb(
      null, 
      Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname)
    )
  }

})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter( req, file, cb ) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error ('Nos aceitamos apenas .png e .jpeg'))
    }

    cb(undefined, true)
  }
})

module.exports = { imageUpload }