import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../context/UserContext'
import Input from '../../form/Input'
import styles from '../../form/Form.module.css'


export default function Register () {

  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange (event) {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  function handleSubmit (event) {
    event.preventDefault()

    register(user)
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Registrar-se</h1>

        <Input 
          text="Nome:" 
          type="text" 
          name="name" 
          placeholder="Insira seu nome"
          onChange={handleChange}
        />

        <Input 
          text="E-mail:" 
          type="email" 
          name="email" 
          placeholder="Insira seu email"
          onChange={handleChange}
        />

        <Input 
          text="Telefone:" 
          type="tel" 
          name="phone" 
          placeholder="Insira seu telefone"
          onChange={handleChange}
        />

        <Input 
          text="Senha:" 
          type="password" 
          name="password" 
          placeholder="Insira sua senha"
          onChange={handleChange}
        />

        <Input 
          text="Confirme sua senha:" 
          type="password" 
          name="confirmPassword" 
          placeholder="Repita sua senha"
          onChange={handleChange}
        />

        <button type="submit">Registrar</button>

        <footer>
          <Link to="/login">
            Já possui uma conta?
          </Link>
        </footer>

      </form>
    </main>
  )
}
