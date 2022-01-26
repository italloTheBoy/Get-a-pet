import api from '../utils/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlash from './useFlash'


export default function useAuth() {

  const  { setFlash } = useFlash()
  const [ auth, setAuth ] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`

      setAuth(true)
    }
  }, [])


  async function log(data) {
    setAuth(true)

    localStorage.setItem('token', JSON.stringify(data.token))
    
    navigate('/')
  }

  async function logout() {

    setAuth(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined

    navigate('/login')

  }

  async function login(user) {

    let flashText = 'Login Realizado.'
    let flashType = 'success'

    try {
      const data = await api.post('/login', user).then(res => res.data)

      await log(data)
    }
    catch (err) {
      flashText = err.response.data.error.message
      flashType = 'error'
    }
    
    setFlash(flashText, flashType)
  }

  async function register(user) {
    let flashText = 'Cadastro Realizado.'
    let flashType = 'success'

    try{
      const data = await api.post('/register', user).then(res => res.data)

      await log(data)
    }
    catch (err) {
      flashText = err.response.data.message
      flashType = 'error'
    }

    setFlash(flashText, flashType)
  }


  return { auth, register, logout, login }
}
