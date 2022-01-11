const jwt = require('jsonwebtoken')
require('dotenv').config()


class Token {

  static async generateUserToken( user, status, req, res) {
    const secret = process.env.SECRET

    const token = jwt.sign({
      id: user.id,
      name: user.name,
    }, secret )

    return res.status(status).json({ token })
  }

}


module.exports = Token