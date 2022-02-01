import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import  useFlash from '../../../hooks/useFlash';
import { PetForm } from '../../form/PetForm';
import api from '../../../utils/api';
import styles from './AddPet.module.css';


export function EditPet() {
   const [ token ] = useState(localStorage.getItem('token') || '')
   const [ pet, setPet ] = useState({})
   const { setFlash } = useFlash()
   const navigate = useNavigate()
   const { id } = useParams()

   useEffect(() => {
      
      api.get(`/pet/${id}`, {
         headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
         }
      })
      .then(async res => await setPet(res.data.pet))
      .catch(err => setFlash(err.response.data.mrssage, 'error'))

   }, [ token, id ])

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

      await api.patch(`/pet/${id}`, formData, {
         headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data',
         }
      })
      .then(res => setFlash(res.data.message, 'success'))
      .catch(err => setFlash(err.response.data.message, 'error'))

      navigate('/pet/my')
   }

   return (
      <>
         <header className={styles.addPet}>
            <h1>Editar Pet</h1>
         </header>

         {
            pet._id && (
               <PetForm btnText="Editar" petData={pet} onSubmit={handleSubmit} />
            )
         }
      </>
   )
}