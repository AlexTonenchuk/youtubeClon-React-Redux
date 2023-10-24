import React from "react";
import styles from './btnPlayNext.module.css'
import { useDispatch } from "react-redux";
import { setPlayNext} from "./btnPlayNextSlice";

// Эта кнопка вынесена отдельным компонентом т.к.
// она работает для текущего видео 
export function BtnPlayNext(){
  const dispatch = useDispatch()


  return (
    <button
      id='btnPlayNext'
      className={styles.btnPlayNext}
      onClick={ ()=> dispatch(setPlayNext(true)) }       
    >
    </button>
  )
}