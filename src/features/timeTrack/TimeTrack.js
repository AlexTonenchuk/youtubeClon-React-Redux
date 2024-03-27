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
  const {
    hide,
    popup,
    red,
    track,
    visible,
  } = styles
  // локальный стейт для управления всплывающим окном со временем,
  // соответствующем позиции курсора на трэке
  const [popupState, setStatePopup] = useState({
    visibility: hide,
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
    const marginLeft = e.currentTarget.getBoundingClientRect().left
    console.dir(e.clientX)
    const width = e.currentTarget.getBoundingClientRect().width
    const time = Math.floor( (e.clientX-marginLeft)*duration/width )
    setStatePopup((state)=>({
      ...state,
      visibility: visible,
      left: (e.clientX-marginLeft),
      timeInPopup: time
    }))
  }
  //обработчик скрывает всплывающее окно
  const hideTimePopup =(e)=>{
    setStatePopup((state)=>({...state, visibility: hide}))
  }
  return (
    <div  className = {track} onClick = {fastForward} onMouseOut = {hideTimePopup} onMouseMove = {moveTimePopup}>
      <div className={red} style={{width: currentTime*100/duration + '%'}} > 
      </div>
      <div className = {popup +' '+ popupState.visibility} style={{left:popupState.left}}>
        {popupState.timeInPopup}
      </div>
    </div>
  )
}