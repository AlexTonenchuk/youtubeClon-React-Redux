import React from 'react'
import styles from './inscription.module.css'
import { useState } from 'react'

export function Inscription () {
  const [isVisible, setIsVisible]=useState(true)

  return (
      <div className={isVisible===true ? styles.inscription: styles.hide}>

        <div className={styles.text}> Кнопки и меню, выделенные красным пунктиром: </div>
        
        <button className={styles.border}> Кнопка / меню </button>

        <div className={styles.text}> временно не работают </div>
       
        <button className={styles.ok} onClick={()=>setIsVisible(false)}> понятно </button>

      </div>
  )
}