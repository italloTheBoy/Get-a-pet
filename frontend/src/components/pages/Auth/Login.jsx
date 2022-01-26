import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../context/UserContext'
import Input from '../../form/Input'
import styles from '../../form/Form.module.css'

function Login () {

  const [user, setUser] = useState({})
  const { login } = useContext(Context)


  function handleChange (event) {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  function submit (event) {
    event.preventDefault()

    login(user)
  }

  return (
    <main>
      <form onSubmit={submit} className={styles.form}>
        <h1>Login</h1>

        <Input 
          text="E-mail:" 
          type="email" 
          name="email" 
          placeholder="Insira seu email"
          onChange={handleChange}
        />

        <Input 
          text="Senha:" 
          type="password" 
          name="password" 
          placeholder="Insira sua senha"
          onChange={handleChange}
        />

        <button type="submit">Entrar</button>

        <footer>
          <Link to="/register">
            Ainda não possui uma conta?
          </Link>
        </footer>

      </form>
    </main>
  )
}

export default Login