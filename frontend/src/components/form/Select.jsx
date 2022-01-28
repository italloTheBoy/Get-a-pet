import styles from './Select.module.css';

export function Select({ text, name, options, value, onChange }) {
   return (
      <div className={styles.select}>
      <label htmlFor={name}>{text}</label>

      <select 
         name={name} 
         id={name}   
         value={value || ''} 
         onChange={onChange}
      >
         <option>Selecione uma cor</option>
         {options.map(option => (
            <option key={option} value={option}>{option}</option>
         ))}
      </select>
    </div>
   )
}