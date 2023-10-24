import React from "react";
import styles from './settingsMenu.module.css'
import { useDispatch } from "react-redux";
import { setSettingsMenu } from "../btnSettings/btnSettingsSlice";


export function SettingsMenu () {
  const dispatch = useDispatch()
  const changeMenu =(e)=> {
    const id = e.target.id
    const idP = e.target.parentNode.id
    if ( (id || idP) === 'speed' ) { dispatch(setSettingsMenu('speedMenu')) }
  }
  const {
    iconField, 
    nameField, 
    qualityIcon,
    settingRow,
    settingsMenu,
    speedIcon,
    valueField,
  } = styles
  //RETURN
  return (
      <div  id='settingsMenu' 
            className = { settingsMenu } 
            onClick = { changeMenu }>
        
        <div  id='speed' className = { settingRow } >
          <div className={ iconField +' '+ speedIcon }>     </div>
          <div className={ nameField }> {'Скорость'}        </div>
          <div className={ valueField }> '60km'             </div>
        </div>

        <div id='quality' className = { settingRow } >
          <div className={ iconField +' '+ qualityIcon }>   </div>
          <div className={ nameField }> {'Качество'}        </div>
          <div className={ valueField }> 'HD'               </div>
        </div>

      </div>
  )
}