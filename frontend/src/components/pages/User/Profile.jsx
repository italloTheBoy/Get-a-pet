import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'
import { useState, useEffect } from 'react'
import useFlash from '../../../hooks/useFlash'
import api from '../../../utils/api'
import Input from '../../form/Input'
import Img from '../../layouts/Img'


export default function Profile () {

  const { setFlash } = useFlash()
  const [ user, setUser ] = useState({})
  const [ preview, setPreview ] = useState()
  const [ token ] = useState(localStorage.getItem('token') || '')


  useEffect(() => {

    api.get('/check', { 
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(res => setUser(res.data))

  }, [ token ])


  function handleChange (event) {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  function handleChangeFile (event) {
    setUser({ ...user, [event.target.name]: event.target.files[0] })
    setPreview(event.target.files[0])
  }

  async function submit (event) {
    event.preventDefault()
    let flashType


    const formData = new FormData()

    await Object.keys(user).forEach(key => {
      formData.append(key, user[key])
    })


    const data = await api.patch(`/${user._id}/edit`, formData, {

      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }

    })
    .then(response => {
      flashType = 'success'
      return response.data
    })
    .catch(err => {
      flashType = 'error'
      return err.response.data
    })


    setFlash(data.message, flashType)
  }


  return (
    <main>
      <header className={styles.profileHeader}>
        <h1>Perfil</h1>
        
        {(user.image || preview) && (

          <Img format="circle" alt={user.name} src={
            preview 
            ? URL.createObjectURL(preview)
            : `${process.env.REACT_APP_API}/img/users/${user.image}`  
          } />
        )}
      </header>

      <form onSubmit={submit} className={formStyles.form}>
        <Input 
          text="Foto:" 
          type="file" 
          name="image" 
          onChange={handleChangeFile}
        />

        <Input 
          text="Nome:" 
          type="text" 
          name="name" 
          placeholder="Insira seu nome"
          value={user.name || ''} 
          onChange={handleChange}
        />

        <Input 
          text="E-mail:" 
          type="email" 
          name="email" 
          placeholder="Insira seu email"
          value={user.email || ''} 
          onChange={handleChange}
        />

        <Input 
          text="Telefone:" 
          type="tel" 
          name="phone" 
          placeholder="Insira seu telefone"
          value={user.phone || ''} 
          onChange={handleChange}
        />

        <Input 
          text="Senha:" 
          type="password" 
          name="password" 
          placeholder="Insira sua senha"
          onChange={handleChange}
        />

        <button type="submit">Editar</button>
      </form>
    </main>
  )
}