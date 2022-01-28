import styles from './Img.module.css'

export default function Img({src, alt, width}) {

  const size = 'px' + width 

  return (
    <img 
      className={`${styles.rounded} ${styles[size]}`}
      src={src}
      alt={alt}
    />
  ) 
}