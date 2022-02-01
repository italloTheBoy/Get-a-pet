import styles from './AddPet.module.css';
import api from '../../../utils/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlash from '../../../hooks/useFlash';
import { PetForm } from '../../form/PetForm';

export function AddPet() {
   const [ token ] = useState(localStorage.getItem('token') || '')
   const { setFlash } = useFlash()
   const navigate = useNavigate()

   async function handleSubmit(pet) {
      const formData = new FormData()

      Object.keys(pet).forEach(key => {

         if (key === 'images') {
            pet.images.forEach((image, index) => {
               formData.append('images', pet[key][index])
            })
         } 
         else {
            formData.append(key, pet[key])
         }
         
      })
   
      await api.post('/pet', formData, {
         headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data',
         }
      })
      .then(response => {
         setFlash(response.data.message, 'success')
         navigate('/pet/my')
      })
      .catch(err => {
         setFlash(err.response.data.message, 'error')
      })

   }

   return (
      <>
         <header className={styles.addPet}>
            <h1>Cadastre Um Pet</h1>
            <small>Ele ficará disponível para adoção</small>
         </header>

         <PetForm btnText="Cadastrar" onSubmit={handleSubmit} />
      </>
   )
}