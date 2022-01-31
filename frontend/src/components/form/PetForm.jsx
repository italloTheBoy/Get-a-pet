import styles from './Form.module.css';
import { useState } from 'react';
import Input from './Input'
import { Select } from './Select';
import Img from '../layouts/Img';


export function PetForm({onSubmit, petData, btnText }) {
   const [pet, setPet] = useState(petData || {})
   const [preview, setPreview] = useState([])
   const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo', 'Marrom', 'Mesclado', 'Outro']


   function handleChange(event) {
      setPet({ ...pet, [event.target.name]: event.target.value })
   }

   function handleFile(event) {
      setPreview(Array.from(event.target.files))
      setPet({ ...pet, images: [...event.target.files] })
   }

   function handleColor (event) {
      event.target.options[event.target.selectedIndex].value === 'Selecione uma cor'
      ? setPet({ ...pet, color: undefined })
      : setPet({ ...pet, color: event.target.options[event.target.selectedIndex].text })  
   }

   function submit(event) {
      event.preventDefault()
      console.log(pet)
      onSubmit(pet)
   }


   return (
      <form onSubmit={submit} className={styles.form}>
         
         <article className={styles.someImg}>
            {
               preview.length > 0
               ? preview.map((image, index) => (
                  <Img
                     src={URL.createObjectURL(image)}
                     alt={pet.name}
                     key={`${pet.name}+${index}`}
                     format="square"
                     width="100"
                  />
               )) 
               : pet.images && (
                  pet.images.map((image, index) => (
                     <Img
                        src={`${process.env.REACT_APP_API}/img/pets/${image}`}
                        alt={pet.name}
                        key={`${pet.name}+${index}`}
                        format="square"
                        width="100"
                     />
                  ))
               )
            }
         </article>

         <Input 
            text="Fotos:" 
            type="file" 
            name="images" 
            onChange={handleFile}
            multiple={true}
         />

         <Input 
            text="Nome:" 
            type="text" 
            name="name" 
            placeholder="Insira o nome do pet"
            value={pet.name || ''} 
            onChange={handleChange}
         />

         <Input 
            text="Idade:" 
            type="number" 
            name="age" 
            placeholder="Insira a idade do pet"
            value={pet.age || ''} 
            onChange={handleChange}
         />

         <Input 
            text="Altura:" 
            type="number" 
            name="weight" 
            placeholder="Insira a altura do pet"
            value={pet.weight || ''} 
            onChange={handleChange}
         />

         <Select 
            text="Cor:" 
            name="color" 
            value={pet.color || ''} 
            onChange={handleColor}
            options={colors}
         />

         <button type="submit">{btnText}</button>
      </form>
   )
}