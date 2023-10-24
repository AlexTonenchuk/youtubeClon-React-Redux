import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSpeed, setSpeed } from "./speedMenuSlice";
import styles from "./speedMenu.module.css"
import { setSettingsMenu } from "../btnSettings/btnSettingsSlice";


export function SpeedMenu () {
  const speed = useSelector( selectSpeed )
  const dispatch = useDispatch()
  const changeSpeed =(e)=> {
    const id = e.target.parentNode.id
    if ( id && id !== 'backFromSpeed' ) { dispatch( setSpeed(id) ) }
    if ( id === 'backFromSpeed' )       { dispatch( setSettingsMenu('settingsMenu')) }
  }
  const {
    iconField,
    checkMarkIcon,
    rowField,
    valueField,
    speedMenu,
  } = styles
  const values = ['backFromSpeed', '0.25', '0.5', '0.75', '1', '1.25', '1.5', '1.75', '2']
  const speeds = values.map( (item)=> {
    if (item === speed) {
      return (
        <div id={item} key={item} className={rowField}>
          <div className={iconField+' '+  checkMarkIcon  }> </div>
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
      { speeds }
    </div>
  )
}