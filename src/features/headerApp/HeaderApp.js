import React from 'react';
import styles from './HeaderApp.module.css';
import logoYou from './youtube.png'
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Search } from '../search/Search';
import { selectScreenSize } from '../panScreenSize/panScreenSizeSlice'


export function HeaderApp() {
  const {
    centralContainer,
    entryBtn,
    hide,
    leftContainer,
    logo,
    mainContainer,
    prompt,
    rightContainer,
    settingsBtn,
    sideBarBtn,
  } = styles
  const navigate = useNavigate()
  const [settingsPromptClass, setSettingsPromptClass] = useState(hide);
  const showSettingsPrompt = () =>  setSettingsPromptClass(prompt);
  const hideSettingsPrompt = () =>  setSettingsPromptClass(hide);
  const screenSize = useSelector(selectScreenSize)
  const calcContainerStyle=()=>{
    if (screenSize==='smallScreen' || screenSize=== 'bigScreen') {return mainContainer}
    if (screenSize==='fullScreen') {return hide}
  }
  const reload = () => {
    navigate( '/' )
    window.location.reload()
  }
  return (
    <div className={calcContainerStyle()} >
      <div  id = 'leftContainer' className={leftContainer} >
        <button className={sideBarBtn}> </button>
        <img src={logoYou} alt='logoYT' className={logo} onClick={reload}/>
      </div>
      <div id='centralContainer' className={centralContainer} >
        <Search/>
      </div>
      <div id='rightContainer' className={rightContainer} >
        <button className={settingsBtn} onMouseOver={showSettingsPrompt} onMouseLeave={hideSettingsPrompt}>
          <div className={settingsPromptClass}> Настройки </div>
        </button>
        <button className={entryBtn}></button>
      </div>
    </div>
  );
}
