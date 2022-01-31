import styles from './Img.module.css'

export default function Img({src, alt, width, format}) {

  const size = 'px' + width 

  return (
    <img 
    src={src}
    alt={alt}
    className={`${styles[format]} ${styles[size]}`}
    />
  ) 
}