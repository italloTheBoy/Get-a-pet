import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context/UserContext'
import styles from './Navbar.module.css'
import Logo from '../../assets/img/logo.png'

function Navbar () {
  const { auth } = useContext(Context)


  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Logo} alt="Get a Pet" />
        <h2>Get a Pet</h2>
      </div>

      <ul className="bold">
        <li>
          <Link to="/">Home</Link>
        </li>

        { auth ? (
          <>
            <p>Logado</p>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Registrar-se</Link>
            </li>
          </>
        )}
        
      </ul>
    </nav>
  )
}

export default Navbar