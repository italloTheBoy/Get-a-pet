import { useState, useEffect } from 'react'
import useFlash from '../../../hooks/useFlash'
import { Link } from 'react-router-dom'
import Img from '../../layouts/Img'
import styles from './Dashboard.module.css'
import api from '../../../utils/api'

export function MyPets() {
    const [ token ] = useState(localStorage.getItem('token'))
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

    async function deletePet(id) {
        await api.delete(`/pet/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
        .then(res => {
            const noDeleted = pets.filter(pet => pet._id !== id)
            setPets(noDeleted)

            return setFlash(res.data.message, 'success')
        })
        .catch(err => setFlash(err.response.data.message, 'error'))
    }

    async function adopt(id) {
        api.patch(`/pet/adopt/conclude/${id}`, {
            headers: { Authorization: `Bearer ${ JSON.parse(token) }` }
        })
        .then(res => setFlash(res.data.message, 'success'))
        .catch(err => setFlash(err.response.data.message, 'error'))
    }


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
                                {pet.adopter && (
                                    <button onClick={() => adopt(pet._id)} className={styles.green}>Concluir Ado????o</button>
                                )}

                                <Link 
                                    to={`/pet/edit/${pet._id}`} 
                                    className={styles.blue}
                                >Editar</Link>

                                <button 
                                    className={styles.red} 
                                    onClick={() => deletePet(pet._id)}

                                >Excluir</button>
                            </nav>
                        ) : (
                            <nav className={styles.nav}>
                                <button className={styles.grey} disabled>Adotado</button>
                            </nav>
                        )
                        }
                    </article>
                ))}
                {pets.length === 0 && <p>Voc?? ainda n??o cadastrou nemhum pet</p>}
            </main>
        </>
    )
}
