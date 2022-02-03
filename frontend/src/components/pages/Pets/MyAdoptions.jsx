import styles from './Dashboard.module.css'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import Img from '../../layouts/Img'

export function MyAdoptions() {
  const [ pets, setPets ] = useState([])
  const [ token ] = useState(localStorage.getItem('token'))

  useEffect(() => {
    api.get('/pet/my/adopted', {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    })
    .then(res => setPets(res.data.pets))
  }, [ token ])
 
  return (
    <>
      <header className={styles.header}>
        <h1>Meus pets</h1>
      </header>
    
      <main className={styles.main}>
        {pets.length > 0 
        
        ? pets.map((pet) => (
          <article key={pet._id} className={styles.row}>
            <Img
              src={`${process.env.REACT_APP_API}/img/pets/${pet.images[0]}`}
              alt={pet.name}
              format="circle"
              width="75"
            />
            <p className="bold">{pet.name}</p>

            {pet.avalibe

              ? (
              <>
                <div className={styles.contact}>
                  <p><span className="bold">Ligue para:</span> {pet.user.phone}</p>
                  <p><span className="bold">Fale com:</span> {pet.user.name}</p>
                </div>

                <nav className={styles.nav}>
                  <p className={styles.grey}>Adoção em processo</p>
                </nav>
              </>
              )
            
            : (
              <nav className={styles.nav}>
                <p className={styles.grey}>Adotado</p>
              </nav>
            )
            
            }

          </article>
        ))

        : (
          <h1>Não foi possivel localizar suas adoçoes.</h1>
        )


        }
      </main>
    
    
    </>
  )
}