import React from "react";
import styles from './btnFullScreen.module.css'
import { useSelector, useDispatch } from "react-redux";
import { selectScreenSize, setScreenSize } from "../panScreenSize/panScreenSizeSlice";

export function BtnFullScreen () {
  const screenSize = useSelector( selectScreenSize )
  const dispatch = useDispatch()
  const changeScreenSize =()=> {
    if (screenSize==='fullScreen') { dispatch(setScreenSize('smallScreen')) }
    if (screenSize !=='fullScreen') { dispatch(setScreenSize('fullScreen')) }
  }
  const { button, fullScreenBtn, noFullScreenBtn } = styles
  // RETURN:
  return (
    <div>
      <div 
        id='fullScreen' 
        className={ button+' '+ (screenSize==='fullScreen' ? fullScreenBtn : noFullScreenBtn) } 
        onClick={ changeScreenSize }> 
      </div>
    </div>
  )
}