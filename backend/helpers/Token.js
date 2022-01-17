const jwt = require('jsonwebtoken')
require('dotenv').config()


class Token {

  static async generateUserToken ( user, status, req, res ) {
    const secret = process.env.SECRET

    const payload = {
      id: user.id,
      name: user.name,
    }

    const token = jwt.sign( payload, secret )

    return res.status(status).json({ token })

  }


  static get (req) {
    const authHeader = req.headers.authorization

    return authHeader 
      ? authHeader.split(' ')[1]
      : null


  }


  static check (req, res, next) {
    
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Acesso negado' })
    }

    
    const token = Token.get(req)

    if (!token) {
      return res.status(401).json({ message: 'Acesso negado' })
    }


    const secret = process.env.SECRET

    try {
      const user = jwt.verify(token, secret)

      if (!user.id || !user.name) {
        return res.status(406).json({ message: 'Token invalido' })
      }

      req.userId = user.id 

      next()
    }
    catch (err) {
      console.error(err)
      return res.status(422).json({ message: 'Token invalido' })
    }

  }

}


module.exports = Token