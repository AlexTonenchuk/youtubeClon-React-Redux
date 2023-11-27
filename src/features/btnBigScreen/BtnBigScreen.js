import React from "react";
import styles from './btnBigScreen.module.css'
import { useSelector, useDispatch } from "react-redux";
import { setScreenSize, selectScreenSize } from "../panScreenSize/panScreenSizeSlice";

// Эта кнопка вынесена отдельным компонентом т.к.
// она переключает размер экрана для любого видео глобально
export function BtnBigScreen(){
  const dispatch = useDispatch()
  const screenSize = useSelector( selectScreenSize )

  const changeScreenSize =()=> {
    if (screenSize==='bigScreen'){
      dispatch(setScreenSize('smallScreen'))
    } else if (screenSize==='smallScreen'){
        dispatch(setScreenSize('bigScreen'))
    }
  }

  return (
    <button
      id='btnScreenSize'
      className={screenSize==='smallScreen' ? styles.largeRectangle : styles.smallRectangle}
      onClick={ changeScreenSize }       
    >
    </button>
  )
}