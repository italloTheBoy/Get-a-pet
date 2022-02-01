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
      return res.status(500).json({ message: 'Ocorreu um erro inesperado' })
    })
    

    if ( !name || typeof name !== 'string' || name.trim() === '' ) {
      return res.status(422).json({ message: 'Insira o nome do seu pet.' })
    }

    if ( !age || typeof age !== 'number' ) {
      return res.status(422).json({ message: 'Insira a idade do seu pet.'})
    }

    if ( !weight || typeof weight !== 'number' ) {
      return res.status(422).json({ message: 'Insira o peso do seu pet.'})
    }

    if ( !color || color === "undefined" || typeof color !== 'string' || color.trim() === '' ) {
      return res.status(422).json({ message: 'Insira a cor do seu pet.'})
    }

    if ( images.length === 0 ) {
      return res.status(422).json({ message: 'Insira ao menos uma foto do seu pet.'})
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

    return res.status(201).json({ 
      message: 'Pet cadastrado com sucesso!',
      pet,
    })
        
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
        return res.status(406).json({ message: 'Não foi possível carregar os dados do pet' })
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

  static async patch (req, res) {
    const { name, age, weight, color } = req.body
    const images = req.files
    const petId = req.params.id
    const userId = req.userId


    if (Object.keys(req.body).length === 0  && images.length === 0) {
      return res.status(400).json({ message: 'Dados insuficientes'})
    }
    else if (!name && !age && !weight && !color && images.length === 0) {
      return res.status(400).json({ message: 'Dados insuficientes'})
    }


    try {
      const user = await User.findById(userId).select('_id')

      if (!user) {
        return res.status(401).json({ message: 'Acesso negado' })
      }


      let error = {}
      let pet = {}

      if (name) {
        if (typeof name !== 'string' || name.trim() === '') {
          return res.status(422).json({message: 'Nome invalido'})
        }
        else {
          pet.name = name.trim().toLowerCase()
        }
      }

      if (weight) { 
        if (isNaN(weight)) {
          return res.status(422).json({message: 'Peso invalida'})
        }
        else {
          pet.weight = Number(weight)
        }
      }

      if (age) {
        if (isNaN(age)) {
          return res.status(422).json({message: 'Idade invalida'})
        }
        else {
          pet.age = Number(age)
        }
      }

      if (color) {
        if (typeof color !== 'string' || color.trim() === '') {
          return res.status(422).json({message: 'Cor invalida'})
        }
        else {
          pet.color = color.trim().toLowerCase()
        }
      }

      if (images.length !== 0) {
          let imagesNames = []
  
          images.map(image => imagesNames.push(image.filename))
  
          pet.images = imagesNames
      }


      pet = await Pet.findOneAndUpdate({
        _id: petId,
        'user._id': user._id, 
      }, pet)


      if (!pet) {
        return res.status(406).json({ message: 'O pet solicitado não existe'})
      }

      return res.status(200).json({ message: 'Pet editado'})

    }
    catch (err) {
      console.error(err)

      res.status(500).json({ message: 'Ocorreu um erro inesperado' })
    }

  }

  static async adopt (req, res) {
    const userId = req.userId
    const petId = req.params.id

    try {
      const user = await User.findById(userId).select('-password')

      if (!user) {
        return res.status(401).json({ message: 'Login necéssario' })
      }

      const pet = await Pet.findById(petId)

      if (!pet) {
        return res.status(406).json({ message: 'Pet não encontrado' })
      }

      if (pet.adopter) {
        return res.status(406).json({ message: 'Esse pet ja esta em um processo de adoção' })
      }

      if (pet.user._id.equals(user._id)) {
        return res.status(403).json({ message: 'O pet ja pertence a você' })
      }


      const adopter = await pet.update({
        adopter: { 
          _id: user._id,
        }
      })

      if (!adopter) {
        return res.status(500).json({ message: 'Ocorreu um erro inesperado' })
      }


      return res.status(200).json({ message: 'Visita agendada' })
    }
    catch (err) {
      console.log(err)

      throw res.status(500).json({ message: 'Ocorreu um erro inesperado'})
    }
  }

  static async adoptEnd (req, res) {
    const userId = req.userId
    const petId = req.params.id

    try {
      const user = await User.findById(userId).select('-password')

      if (!user) {
        return res.status(401).json({ message: 'Login necéssario' })
      }


      const pet = await Pet.findById(petId)

      if (!pet.avalibe) {
        return res.status(400).json({ message: 'Este pet não esta disponivel' })
      }

      if (!pet) {
        return res.status(406).json({ message: 'Pet não encontrado' })
      }

      if (!pet.user._id.equals(user._id)) {
        return res.status(403).json({ message: 'Acesso negado.' })
      }
      

      const avalibe = await Pet.findByIdAndUpdate(pet._id, {
        avalibe: false
      })

      if (!avalibe) {
        return res.status(500).json({ message: 'Ocorreu um erro inesperado'})
      }


      res.status(200).json({ message: 'Adoção concluida'})
    }
    catch (err) {
      console.log(err)

      throw res.status(500).json({ message: 'Ocorreu um erro inesperado'})
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
