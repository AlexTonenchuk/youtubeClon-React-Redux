import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSpeed, setSpeed } from "./speedMenuSlice";
import styles from "./speedMenu.module.css"
import { setSettingsMenu } from "../btnSettings/btnSettingsSlice";


export function SpeedMenu () {
  const speed = useSelector( selectSpeed )
  const dispatch = useDispatch()
  const changeSpeed =(e)=> {
    const idP = e.target.parentNode.id
    if ( idP && idP !== 'back' )  { dispatch( setSpeed(idP) ) }
    if ( e.target.id === 'back' ) { dispatch( setSettingsMenu('settingsMenu')) }
  }
  const {
    iconField,
    checkMarkIcon,
    rowField,
    valueField,
    speedMenu,
  } = styles
  const values = ['0.25', '0.5', '0.75', '1', '1.25', '1.5', '1.75', '2']
  const speeds = values.map( (item)=> {
    if (item === speed) {
      return (
        <div id={item} key={item} className={rowField}>
          <div className={iconField+' '+  checkMarkIcon  }>  </div>
          <div className={valueField}>  {item}  </div>
        </div>
      ) 
    } else {
      return (
        <div id={item} key={item} className={rowField}>
          <div className={iconField}> </div>
          <div className={valueField}>  {item}  </div>
        </div>
      ) 
    }
  })
  // RETURN
  return (
    <div className={speedMenu} 
          onClick={changeSpeed}>
      <div id='back' key='back' className={rowField}> {'< Скорость воспроизведения'} </div>
      { speeds }
    </div>
  )
}