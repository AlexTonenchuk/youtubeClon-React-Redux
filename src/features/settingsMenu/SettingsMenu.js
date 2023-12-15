import React from "react";
import styles from './settingsMenu.module.css'
import { useDispatch, useSelector } from "react-redux";
import { setSettingsMenu } from "../btnSettings/btnSettingsSlice";
import { selectSpeed } from "../speedMenu/speedMenuSlice";


export function SettingsMenu () {
  const dispatch = useDispatch()
  const speed = useSelector(selectSpeed)
  const changeMenu =(e)=> {
    const id = e.target.id
    const idP = e.target.parentNode.id
    if ( (id || idP) === 'speed' ) { dispatch(setSettingsMenu('speedMenu')) }
  }
  const {
    dontWork,
    iconField, 
    nameField, 
    qualityIcon,
    settingRow,
    settingsMenu,
    speedIcon,
    subtitlesIcon,
    valueField,
  } = styles
  //RETURN
  return (
      <div  id='settingsMenu'  className = { settingsMenu }  onClick = { changeMenu } >
        
        <div  id='speed' className = { settingRow } >
          <div className={ iconField +' '+ speedIcon }>                </div>
          <div className={ nameField }> {'Скорость воспроизведения'}   </div>
          <div className={ valueField }> {speed}                       </div>
        </div>

        <div  id='subtitles' className = { settingRow+' '+dontWork } >
          <div className={ iconField +' '+ subtitlesIcon }>                     </div>
          <div className={ nameField }> {'Субтитры  (врем. не раб.)'}  </div>
          <div className={ valueField }> рус.                                    </div>
        </div>

        <div id='quality' className = { settingRow+' '+dontWork } >
          <div className={ iconField +' '+ qualityIcon }>                       </div>
          <div className={ nameField }> {'Качество (врем. не раб.)'}   </div>
          <div className={ valueField }> 240                                    </div>
        </div>

      </div>
  )
}