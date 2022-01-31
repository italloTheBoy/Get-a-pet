import { useState, useEffect } from 'react'
import useFlash from '../../../hooks/useFlash'
import { Link } from 'react-router-dom'
import Img from '../../layouts/Img'
import styles from './Dashboard.module.css'
import api from '../../../utils/api'

export function MyPets() {
    const [token] = useState(localStorage.getItem('token'))
    const { setFlash } = useFlash()
    const [pets, setPets] = useState([])

    useEffect(() => {
        api.get('/pet/my/toAdopt', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then(res => setPets(res.data.pets))
        
    }, [ token ])

    return (
        <>
            <header className={styles.header}>
                <h1>Meus Pets</h1>
                <Link to='/pet/register'>Cadastrar pet</Link>
            </header>

            <main className={styles.main}>
                {pets.length > 0 && pets.map(pet => (
                    <article key={pet.id} className={styles.row}>
                        <Img
                            src={`${process.env.REACT_APP_API}/img/pets/${pet.images[0]}`}
                            alt={pet.name}
                            format="circle"
                            width="75"
                        />
                        <p>{pet.name}</p>
                        {pet.avalibe === true ? (
                            <nav className={styles.nav}>
                                {pet.adopter && <button className={styles.green}>Concluir Adoção</button>}
                                <Link to={`/pet/edit/${pet._id}`} className={styles.blue}>Editar</Link>
                                <button className={styles.red}>Excluir</button>
                            </nav>
                        ) :
                            <button disabled>Adotado</button>
                        }
                    </article>
                ))}
                {pets.length === 0 && <p>Você ainda não cadastrou nemhum pet</p>}
            </main>
        </>
    )
}
