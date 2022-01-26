import styles from './Message.module.css';
import { useState, useEffect } from 'react'
import event from '../../utils/event'

export default function Message() {

  const [ visibility, setVisibility ] = useState(false);
  const [ msg, setMsg ] = useState('')
  const [ type, setType ] = useState('')

  useEffect(() => {

      event.on('flash', ({type, msg}) => {
        setVisibility(true)
        setMsg(msg)
        setType(type)        

        setTimeout(() => {
          setVisibility(false)
        }, 10000)
      })

    }, [])

  return (
    visibility && (
      <aside className={`${styles.msg} ${styles[type]}`}>
        <p>{msg}</p>
      </aside>
    )
  )

}