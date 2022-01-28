import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './MyPets.module.css'

export function MyPets() {
    const [pets, setPets] = useState([])

    return (
        <main>
            <header>
                <h1>Meus Pets</h1>
                <Link to='/pet/register'>Cadastrar pet</Link>
            </header>

            <main>
                {pets.length > 0 && <p>Meus Pets</p>}
                {pets.length === 0 && <p>Você ainda não cadastrou nemhum pet</p>}
            </main>
        </main>
    )
}
