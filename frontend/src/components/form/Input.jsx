import styles from './Input.module.css'

export default function Input({
  text, 
  type,
  name, 
  placeholder, 
  value,
  onChange,
  multiple, 
}) 
{
  return (
    <div className={styles.control}>
      <label htmlFor={name}>{text}</label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange} 
        { ...(multiple ? { multiple } : '') }
      />
    </div>
  )
}
 