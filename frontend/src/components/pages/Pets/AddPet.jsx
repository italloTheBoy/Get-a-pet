import styles from './AddPet.module.css';
import api from '../../../utils/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlash } from '../../../hooks/useFlash';
import { PetForm } from '../../form/PetForm';

export function AddPet() {
   const navigate = useNavigate();

   return (
      <>
         <header className={styles.addPet}>
            <h1>Cadastre Um Pet</h1>
            <small>Ele ficará disponível para adoção</small>
         </header>

         <PetForm btnText="Cadastrar" />
      </>
   )
}