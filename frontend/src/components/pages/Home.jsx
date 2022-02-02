import { useState, useEffect } from 'react'
import useFlash from '../../hooks/useFlash'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import styles from './Home.module.css'


function Home () {

  const [pets, setPets] = useState([])
  const { setFlash } = useFlash() 


  useEffect(() => {
    api.get('pet/')
      .then(res => setPets(res.data.pets))

  }, [])


  return (
    <>
      <header className={styles.header}>
        <h1>Adote um pet</h1>
        <small>Conheça os nossos pets.</small>
      </header>

      <main className={styles.main}>
        {pets.length > 0 

          ? pets.map(pet => (
            <section key={pet._id} className={styles.card}>
              
              <aside 
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/img/pets/${pet.images[0]})`
                }}
              ></aside>

              <h2>{pet.name}</h2>

              <span>Peso: {pet.weight}</span>

              {pet.avalibe 
                ? <Link to={`pet/${pet._id}`}>Ver mais...</Link>
                : <p>Adotado</p>
              }

            </section>
          ))  

          : <h1>Ops... Nemhum pet foi encontrado</h1>
        }
      </main>
    
    </>

)
}

export default Home