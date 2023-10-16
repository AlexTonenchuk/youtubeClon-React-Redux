import React from "react";
import styles from './btnAutoplay.module.css'
import { useSelector, useDispatch } from "react-redux";
import { 
  setAutoplay, 
  selectAutoplay 
} from "./btnAutoplaySlice";

// Эта кнопка вынесена отдельным компонентом т.к.
// она переключает автовоспроизведения для всех видео глобально
export function BtnAutoplay(){
  const dispatch = useDispatch()
  const autoplay = useSelector( selectAutoplay )

  const toggleAutoplay =()=> {
    if (autoplay===true){
      dispatch(setAutoplay(false))
    } else if (autoplay===false){
      dispatch(setAutoplay(true))
    }
  }

  return (
    <button
      id='btnAutoplay'
      className={autoplay===true ? styles.autoplayOn : styles.autoplayOff}
      onClick={ toggleAutoplay }       
    >
    </button>
  )
}

