import React, { useState } from "react";
import styles from './timeTrack.module.css'
import { 
  selectCurrentTime, 
  selectDuration, 
  setSpecifiedTime,
} from "../videoList/videoListSlice";
import { useSelector, useDispatch } from 'react-redux'


export function TimeTrack (props) {
  const id = props.id
  const dispatch = useDispatch()
  const currentTime = useSelector( (state)=> selectCurrentTime(state, id) )
  const duration = useSelector( (state)=> selectDuration(state, id) )
  // локальный стейт для управления всплывающим окном со временем,
  // соответствующем позиции курсора на трэке
  const [popupState, setStatePopup] = useState({
    visibility: styles.hide,
    left: 0,
    timeInPopup: 0
  })
  // обработчик вычисляет время, соответствующее позиции курсора 
  // на трэке и отправляет это время в ReduxState
  const fastForward =(e)=>{
    const left = e.currentTarget.getBoundingClientRect().left
    const width = e.currentTarget.getBoundingClientRect().width
    const time = Math.floor( (e.clientX-left)*duration/width )
    dispatch( setSpecifiedTime({id, specifiedTime:time}) )

  }
  //обработчик меняет видимость всплывающего окна, меняет его координату, 
  // меняет значение внутри него в соответствии с позицией курсора на трэке
  const moveTimePopup =(e)=>{
    const left = e.currentTarget.getBoundingClientRect().left
    const width = e.currentTarget.getBoundingClientRect().width
    const time = Math.floor( (e.clientX-left)*duration/width )
    setStatePopup((state)=>({
      ...state,
      visibility: styles.visible,
      left: e.clientX-10,
      timeInPopup: time
    }))
  }
  //обработчик скрывает всплывающее окно
  const hideTimePopup =(e)=>{
    setStatePopup((state)=>({...state, visibility: styles.hide}))
  }
  return (
    <div 
      className = {styles.track}
      onClick = {fastForward}
      onMouseOut = {hideTimePopup}
      onMouseMove = {moveTimePopup}  >
      <div 
        className={styles.red}
        style={{width: currentTime*100/duration + '%' }}   >
      </div>
      <div 
        className = {styles.popup +' '+ popupState.visibility}
        style={{left:popupState.left}}    >
        {popupState.timeInPopup}
      </div>
    </div>
  )
}