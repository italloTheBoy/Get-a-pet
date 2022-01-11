const bcrypt = require('bcrypt');
const User = require('../models/User')
const { generateUserToken } = require('../helpers/Token')


class UserController {

  static async register (req, res) {

    const { name, email, phone, password, confirmPassword } = req.body

    let error = {}

    if (!name || typeof name !== 'string' || name.trim() === '') {
      error.name = 'insira um nome valido'
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      error.email = 'insira um email valido'
    }
    if (!phone || typeof phone !== 'number') {
      error.phone = 'Insira um número de telefone válido'
    }

    if (!password || typeof password !== 'string' || password.trim() === '') {
      error.password = 'Insira uma senha válida'
    }

    if (!confirmPassword || typeof confirmPassword !== 'string' || confirmPassword.trim() === '') {
      error.confirmPassword = 'Insira uma confirmação de senha válida'
    }

    
    if (Object.keys(error).length > 0) return res.status(422).json({ error })


    try {
      const checkUser = await User.findOne({ email })

      if (checkUser) {
        error.email = 'Email já cadastrado'
      }

    }
    catch (err) {
      error.server = 'Erro ao cadastrar o usuário'

      return res.status(500).json({ error })
    }

    if (password.length < 6) {
      error.password = 'Senha muito curta'
    }


    if (Object.keys(error).length > 0) return res.status(422).json({ error })


    if (password !== confirmPassword) {
      error.confirmPassword = 'Senhas não batem'

      return res.status(422).json({ error })
    }


    try {
      const salt = await bcrypt.genSalt(12)
      const hash = await bcrypt.hash(password, salt)

      const user = await User.create({
        name,
        email,
        phone,
        password: hash
      })  

      return await generateUserToken(user, 201, req, res)

    }
    catch (err) {
      console.error(err)

      error.server = 'Erro ao cadastrar o usuário'

      return res.status(500).json({ error })
    }

  }


  static async login (req, res) {

    const { email, password } = req.body
    
    let error = {}

    function returnError () {
      error.message = 'Email ou senha invalidos'

      return res.status(422).json({ error })
    } 


    [email, password].forEach(field => {
      if (!field || typeof field !== 'string' || field.trim() === '') {
        return error.message = 'Email ou senha invalidos'
      }
    })

    
    if (Object.keys(error).length > 0) return res.status(422).json({ error })
    

    try {
      const user = await User.findOne({ email }).lean()

      if (!user) return returnError()
      
      const compared = await bcrypt.compare(password, user.password)
      
      if (!compared) return returnError()


      generateUserToken( user, 200, req, res )

    }
    catch (err) {
      error.server = 'Erro realizar o login'

      return res.status(500).json({ error })
    }

  }

}


module.exports = UserController
