const jwt = require('jsonwebtoken')
require('dotenv').config()


class Token {

  static async generateUserToken( user, status, req, res) {
    const secret = process.env.SECRET

    const token = jwt.sign({
      name: user.name,
      id: user.id,
    }, secret )

    return res.status(status).json({ token })

  }


  static get(req) {
    const authHeader = req.headers.authorization

    return authHeader 
      ? authHeader.split(' ')[1]
      : null


  }

}


module.exports = Token