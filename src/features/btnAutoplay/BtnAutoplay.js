import React from "react";
import styles from './btnAutoplay.module.css'
import { useSelector, useDispatch } from "react-redux";
import { 
  toggleAutoplayIsOn, 
  selectAutoplayIsOn 
} from "./btnAutoplaySlice";


export function BtnAutoplay(){
  const dispatch = useDispatch()
  const autoplay = useSelector( selectAutoplayIsOn )
  //console.dir(autoplay + '---wowowowo')
  return (
    <button
      id='btnAutoplay'
      className={autoplay===true ? styles.autoplayOn : styles.autoplayOff}
      onClick={ ()=>dispatch(toggleAutoplayIsOn()) }       
    >
      autply

    </button>
  )
}

