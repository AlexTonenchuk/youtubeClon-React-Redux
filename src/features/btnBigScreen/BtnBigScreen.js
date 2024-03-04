import React from "react";
import styles from './btnBigScreen.module.css'
import { useSelector, useDispatch } from "react-redux";
import { setScreenSize, selectScreenSize } from "../panScreenSize/panScreenSizeSlice";
import { setSpecifiedTime, selectCurrentTime } from "../videoList/videoListSlice"


export function BtnBigScreen(props){
  const id = props.id
  const dispatch = useDispatch()
  const screenSize =  useSelector( selectScreenSize )
  const currentTime = useSelector( (state)=> selectCurrentTime(state, id) )
  const changeScreenSize =()=> {
    dispatch( setSpecifiedTime({id: id, specifiedTime: currentTime}))
    if (screenSize==='bigScreen')   { dispatch(setScreenSize('smallScreen')) } 
    if (screenSize==='smallScreen') { dispatch(setScreenSize('bigScreen')) }
  }
  
  return (
    <button
      id='btnScreenSize'
      className={ screenSize==='smallScreen' ? styles.largeRectangle : styles.smallRectangle}
      onClick={ changeScreenSize }       
    >
    </button>
  )
}