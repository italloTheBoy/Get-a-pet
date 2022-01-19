const Pet = require('../models/Pet')
const Token = require('../helpers/Token')
const User = require('../models/User')


class PetController {

  static async add(req, res) {

    const { name, color } = req.body
    const age = Number(req.body.age)
    const weight = Number(req.body.weight)
    let images = req.files
    const userId = req.userId
    
    let error = {}
    

    const user = await User.findById(userId).select('_id name image phone').lean()
    .then(user => {

      if (!user) {
        return res.status(401).json({ message: 'Login necéssario' })
      }

      return user

    })
    .catch(() => {
      console.log(err)
      return res.status(500).json({ error: 'Ocorreu um erro inesperado' })
    })
    

    if ( !name || typeof name !== 'string' || name.trim() === '' ) {
      error.name = 'Insira o nome do seu pet.'
    }

    if ( !age || typeof age !== 'number' ) {
      error.age = 'Insira a idade do seu pet.'
    }

    if ( !weight || typeof weight !== 'number' ) {
      error.weight = 'Insira a altura do seu pet.'
    }

    if ( !color || typeof color !== 'string' || color.trim() === '' ) {
      error.color = 'Insira a cor do seu pet.'
    }

    if ( images.length === 0 ) {
      error.images = 'Insira ao menos uma foto do seu pet.'
    }


    if (Object.keys(error).length > 0) {
      return res.status(422).json({ error })
    } 


    let imagesArray = []

    images.map(image => {
      imagesArray.push(image.filename)
    })


    const pet = await Pet.create({
      name: name.trim().toLowerCase(), 
      age, 
      weight,
      color: color.trim().toLowerCase(),
      images: imagesArray,
      user,
    })

    return res.status(201).json({ message: 'Pet registrado', pet })
        
  }
  
  static async getAll(req, res) {
    
    try {
      const pets = await Pet.find().sort('-createdAt')
      
      return res.status(200).json({ pets })
    }
    catch (err) {
      console.log(err)

      return res.status(500).json({ message: 'Ocorreu um erro inesperado'})
    }

  }

  static async getById(req, res) {

    const { id } = req.params


    try {
      const pet = await Pet.findById(id)

      if (!pet) {
        return res.status(406).json({ message: 'Pet não encontrado' })
      }

      res.status(200).json({ pet })
    }
    catch (err) {
      console.log(err)

      return res.status(500).json({ message: 'Ocorreu um erro inesperado'})
    }
  }


  static async toAdopt(req, res) {

    const userId = req.userId

    try {
      const user = await User.findById(userId).select('_id')

      const pets = await Pet.find({ 'user._id': user._id })

      res.status(200).json({ pets })
    }
    catch (err) {
      console.log(err)

      return res.status(500).json({ message: 'Ocorreu um erro inesperado'})
    }

  }


  static async adopted(req, res) {
   
    const userId = req.userId

    try {
      const user = await User.findById(userId).select('_id')

      const pets = await Pet.find({ 'adopter._id': user._id })

      res.status(200).json({ pets })
    }
    catch (err) {
      console.log(err)

      return res.status(500).json({ message: 'Ocorreu um erro inesperado'})
    }
 
  }

  static async delete(req, res) {
    const userId = req.userId
    const { id } = req.params

    try {
      const user = await User.findById(userId)

      if (!user) {
        return res.status(401).json({ message: 'Acesso negado'})
      }


      const deletedPet = await Pet.findOneAndDelete({ 
        _id: id,
        'user._id': user._id
      })

      if (!deletedPet) {
        return res.status(406).json({ message: 'Pet não encontrado'})
      }


      return res.status(200).json({ message: 'Pet deletado'})
      
    }
    catch (err) {
      console.log(err)

      return res.status(500).json({ message: 'Ocorreu um erro inesperado'})
    }

    
  }
  
}


module.exports = PetController
