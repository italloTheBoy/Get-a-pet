const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Token = require('../helpers/Token')
require('dotenv').config()


class UserController {

  static async register (req, res) {

    const { name, email, phone, password, confirmPassword } = req.body


    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(422).json({ message: 'Insira um nome valido' })
    }


    if (!email || typeof email !== 'string' || email.trim() === '') {
      return res.status(422).json({ message: 'Insira um email valido' })
    }

    try {
      const checkUser = await User.findOne({ email })
      
      if (checkUser) {
        return res.status(422).json({ message: 'Email já cadastrado' })
      }
      
    }
    catch (err) {
      return res.status(500).json({ message: 'Erro ao cadastrar o usuário'})
    }


    if (!phone || name.trim() === '' || isNaN( Number(phone) )) {
      return res.status(422).json({ message: 'Insira um telrfone valido' })
    }


    if (!password || typeof password !== 'string' || password.trim() === '') {
      return res.status(422).json({ message: 'Insira uma senha valida' })
    }

    if (password.length < 6) {
      return res.status(422).json({ message: 'Senha muito curta' })
    }

    if (!confirmPassword || typeof confirmPassword !== 'string' || confirmPassword.trim() === '') {
      return res.status(422).json({ message: 'Confirme a senha' })
    }
    
    if (password !== confirmPassword) {
      return res.status(422).json({ message: 'Senhas não batem' })
    }


    try {
      const salt = await bcrypt.genSalt(12)
      const hash = await bcrypt.hash(password, salt)

      const user = await User.create({
        name: name.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        phone: Number(phone),
        password: hash
      })  

      return await Token.generateUserToken(user, 201, req, res)

    }
    catch (err) {
      console.error(err)

      return res.status(500).json({ message: 'Erro ao cadastrar o usuário' })
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
        return error.message = 'Preencha todos os campos'
      }
    })

    
    if (Object.keys(error).length > 0) return res.status(422).json({ error })
    

    try {
      const user = await User.findOne({ email })

      if (!user) return returnError()
      
      const compared = await bcrypt.compare(password, user.password)
      
      if (!compared) return returnError()


      Token.generateUserToken( user, 200, req, res )

    }
    catch (err) {
      console.error(err)

      error.server = 'Erro realizar o login'

      return res.status(500).json({ error })
    }

  }


  static async findByToken (req, res) {
    let currentUser = null

    if (req.headers.authorization) {
      const secret = process.env.SECRET
  
      const token = Token.get(req)
      
      const decoded = jwt.verify(token, secret)

      try {
        currentUser = await User.findById(decoded.id).select('-password')
      }
      catch (err) {
        console.log(err)

        return res.statu(500).json({ 
          error: { message: 'Ocoreu um erro inesperado' }

        })
      }
    }

    res.status(200).json({ currentUser })

  }


  static async findById (req, res) {

    const { id } = req.params

    if ( Number(id) === NaN ) {
      return res.status(422).json({ message: 'Usuario não encontrado' })
    }

    try{
      const user = await User.findById(id).select('-password').lean()
 
      if (!user) {
        return res.status(422).json({ message: 'Usuario não encontrado' })
      }

      return res.status(200).json({ user })

    }
    catch (err) {
      console.error(err)

      res.status(500).json({ message: 'Ocorreu um erro na busca por este usuario' })
    }
  }


  static async edit (req, res) {

    const user = await User.findById(req.userId).catch(err => {
      console.error(err)
      
      res.status(500).json({ message: 'Ops... Ocorreu um erro inesperado' })
    })


    if (!user) return res.status(404).json({ message: 'Usuario não encontrado'})
    

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

      if (checkUser && checkUser.email !== user.email) {
        error.email = 'Email já esta em uso'
      }

    }
    catch (err) {
      error.server = 'Erro ao editar o usuário'

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

      const editedUser = await User.findByIdAndUpdate( user.id, {
        name: name.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        phone,
        password: hash
      })  

      return res.status(200).json({ message: 'Dados de usuario editado'})

    }
    catch (err) {
      console.error(err)

      error.server = 'Erro ao editar o usuário'

      return res.status(500).json({ error })
    }

  }


  static async editImage (req, res) {
    
    if (!req.file) {
      return res.status(406).json({ message: 'Por favor, insira uma imagem'})
    }


    const image = req.file.filename 
    const id = req.params.id


    try {
      const user = await User.findByIdAndUpdate(id, { image }).select('image -_id')

      res.status(200).json({ 
        message: 'Imagem editada', 
        image: user.image 
      })
    }
    catch (err) {
      console.error(err)

      res.status(500).json({ message: 'Erro ao editar a imagem'})
    }

  }

}


module.exports = UserController
