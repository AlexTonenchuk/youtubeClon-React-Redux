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
  const putSettingsMenuComponent =()=> {
    if (visibleMenu === "nothing")        { return 'NICHEGO' }
    if (visibleMenu === "settingsMenu")   { return <SettingsMenu/> }
    if (visibleMenu === "speedMenu")      { return <SpeedMenu/> }
  }
  const {
    iconField,
    offIcon,
    onIcon,
    settingsMenuContainer,
  } = styles
  // RETURN:
  return (
    <div>
      <div  className={ iconField+' '+(visibleMenu === 'nothing' ? offIcon : onIcon) }
            onClick={ toggleBtn }>
      </div>
      <div className={ settingsMenuContainer }>
        { putSettingsMenuComponent() }
      </div>
    </div>
  )
}