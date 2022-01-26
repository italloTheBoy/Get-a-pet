import api from '../utils/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlash from './useFlash'


export default function useAuth() {

  const  { setFlash } = useFlash()
  const [ auth, setAuth ] = useState(false)
  const navigate = useNavigate()


  async function log(data) {
    setAuth(true)

    localStorage.setItem('token', JSON.stringify(data.token))
    
    navigate('/')
  }

  async function register(user) {
    let flashText = 'Cadastro Realizado.'
    let flashType = 'success'

    try{
      const data = await api.post('/register', user).then(response => response.data)

      await log(data)
    }
    catch (error) {
      flashText = error.response.data.message
      flashType = 'error'
    }

    setFlash(flashText, flashType)
  }


  return { register, auth }
}
