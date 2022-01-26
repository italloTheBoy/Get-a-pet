import api from '../utils/api'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'


export default function useAuth() {

  async function register(user) {

    try{
      const data = await api.post('/register', user).then(response => response.data)

      console.log(data)
    }
    catch (err) {
      console.log(err)
    }

  }


  return { register }
}
