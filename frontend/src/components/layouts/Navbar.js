import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'
import Logo from '../../assets/img/logo.png'

function Navbar () {
  return (
    <nav className={styles.navbar}>
      <image className={styles.logo}>
        <img src={Logo} alt="Get a Pet" />
        <h2>Get a Pet</h2>
      </image>

      <ul className="bold">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar