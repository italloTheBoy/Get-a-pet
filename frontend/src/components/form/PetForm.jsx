import styles from './Form.module.css';
import { useState } from 'react';
import Input from './Input'
import { Select } from './Select';

export function PetForm({handleSubmit, petData, btnText }) {
   const [pet, setPet] = useState(petData || {})
   const [preview, setPreview] = useState([])
   const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo', 'Marrom', 'Mesclado', 'Outro']


   function handleChange(event) {
      setPet({ ...pet, [event.target.name]: event.target.value })
   }

   function handleFile(event) {

   }

   function handleColor (event) {
      
   }


   return (
      <form className={styles.form}>
         
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
            name="weigth" 
            placeholder="Insira a altura do pet"
            value={pet.weigth || ''} 
            onChange={handleChange}
         />

         <Select 
            text="Cor:" 
            name="color" 
            value={pet.color || ''} 
            onChange={handleColor}
            options={colors}
         />

         <button type="submit">Cadastrar</button>
      </form>
   )
}