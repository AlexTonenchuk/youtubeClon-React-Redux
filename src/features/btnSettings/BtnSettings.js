import React from "react";
import styles from './btnSettings.module.css'
import { SettingsMenu } from "../settingsMenu/SettingsMenu";
import { SpeedMenu } from "../speedMenu/SpeedMenu";
import { useSelector, useDispatch } from "react-redux";
import { selectSettingsMenu, setSettingsMenu } from "./btnSettingsSlice";

export function BtnSettings () {
  const visibleMenu = useSelector( selectSettingsMenu )
  const dispatch = useDispatch()
  const toggleBtn =()=>{
    if (visibleMenu === 'nothing')  { dispatch(setSettingsMenu('settingsMenu')) }
    if (visibleMenu !== 'nothing')  { dispatch(setSettingsMenu('nothing')) }
  }
  const {
    offIcon,
    onIcon,
    settingsMenuContainer,
  } = styles
  
  return (
    <div>
      <button  className={ visibleMenu === 'nothing' ? offIcon : onIcon } onClick={ toggleBtn }>   </button>
      <div className={ settingsMenuContainer }>
        { visibleMenu === "settingsMenu" ? <SettingsMenu/> : false }
        { visibleMenu === "speedMenu" ? <SpeedMenu/> : false }
      </div>
    </div>
  )
}