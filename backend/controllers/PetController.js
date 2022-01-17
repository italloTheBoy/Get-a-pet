const Pet = require('../models/Pet')
const Token = require('../helpers/Token')
const User = require('../models/User')


class PetController {
  static async add(req, res) {

    const { name, age, weight, color, images } = req.body
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

    if (!color || typeof color !== 'string' || color.trim() === '' ) {
      error.color = 'Insira a cor do seu pet'
    }


    if (Object.keys(error).length > 0) {
      return res.status(422).json({ error })
    } 


    const pet = await Pet.create({
      name, 
      age, 
      weight,
      color,
      user,
    })

    return res.status(201).json({ message: 'Pet registrado', pet })
        
  }
}


module.exports = PetController
