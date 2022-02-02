import styles from './Pet.module.css'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link  } from 'react-router-dom'
import useFlash from '../../../hooks/useFlash'
import Img from '../../layouts/Img'


export function Pet() {
  const [ token ] = useState(localStorage.getItem('token')) || ''
  const [pet, setPet] = useState({})
  const { setFlash } = useFlash()
  const { id } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    api.get(`/pet/${id}`)
      .then(res => setPet(res.data.pet))
  }, [ id ])

  function loginRedirect() {
    setFlash('Você precisa estar logado para acessar essa página', 'error')
    navigate('/login')
  }

  async function schedule() {
    await api.patch(`/pet/adopt/${id}`, {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    })
    .then(res => setFlash(res.data.message, 'success'))
    .catch(err => setFlash(err.response.data.message, 'error'))
  }


  return (
    <>
      {pet._id &&
        <section className={styles.container}>
          <header>
            <h1>{pet.name}</h1>
          </header>

          <figure>
            {pet.images.map((image, index) => (
              <Img
                src={`${process.env.REACT_APP_API}/img/pets/${image}`}
                alt={pet.name}
                format="square"
                key={index}
              />
            ))}
          </figure>

          <main>
            <p className="bold">Idade: {pet.age}</p>
            <p className="bold">Peso: {pet.weight}kg</p>
            <p className="bold">Cor: {pet.color}</p>

            {token && token !== '' 
              ? <button onClick={schedule}>Soloicitar visita</button>

              : <button onClick={loginRedirect}>Soloicitar visita</button>
            }
          </main>

        </section>
      }    
    </>
  )
}