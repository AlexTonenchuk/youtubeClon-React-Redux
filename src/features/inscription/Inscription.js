import React from 'react'
import styles from './inscription.module.css'
import { useState } from 'react'

export function Inscription () {
  const {
    border,
    inscription,
    hide,
    ok,
    text,
  } = styles
  const [isVisible, setIsVisible]=useState(true)
  return (
    <div className={isVisible===true ? inscription: hide}>
      <div className={text}> Кнопки и меню, выделенные красным пунктиром: </div>
      <button className={border}> Кнопка / меню </button>
      <div className={text}> временно не работают </div>
      <button className={ok} onClick={()=>setIsVisible(false)}> понятно </button>
    </div>
  )
}