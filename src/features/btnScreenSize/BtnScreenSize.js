import React from "react";
import styles from './btnScreenSize.module.css'
import { useSelector, useDispatch } from "react-redux";
import { 
  setScreenSize, 
  selectScreenSize 
} from "./btnScreenSizeSlice";

// Эта кнопка вынесена отдельным компонентом т.к.
// она переключает размер экрана для всех видео глобально
export function BtnScreenSize(){
  const dispatch = useDispatch()
  const screenSize = useSelector( selectScreenSize )

  const toggleScreenSize =()=> {
    if (screenSize==='large'){
      dispatch(setScreenSize('small'))
    } else if (screenSize==='small'){
        dispatch(setScreenSize('large'))
    }
  }

  return (
    <button
      id='btnScreenSize'
      className={screenSize==='small' ? styles.largeRectangle : styles.smallRectangle}
      onClick={ toggleScreenSize }       
    >
    </button>
  )
}