import React from "react";
import styles from './btnFullScreen.module.css'
import { useSelector, useDispatch } from "react-redux"
import { selectScreenSize, setScreenSize } from "../panScreenSize/panScreenSizeSlice"
import { setSpecifiedTime, selectCurrentTime } from "../videoList/videoListSlice"


export function BtnFullScreen (props) {
  const id = props.id
  const screenSize = useSelector( selectScreenSize )
  const dispatch = useDispatch()
  const currentTime = useSelector( (state)=> selectCurrentTime(state, id) )
  const changeScreenSize =()=> {
    dispatch( setSpecifiedTime({id: id, specifiedTime: currentTime}))
    if (screenSize !=='fullScreen') { 
      document.documentElement.requestFullscreen()
      dispatch(setScreenSize('fullScreen')) 
    }
    if (screenSize==='fullScreen' ) { 
      if (document.fullscreenElement){
        document.exitFullscreen()
      }
      dispatch(setScreenSize('smallScreen')) 
    }
  }
  const { 
    button, 
    fullScreenBtn, 
    noFullScreenBtn 
  } = styles
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