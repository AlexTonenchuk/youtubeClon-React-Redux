import React from 'react';
import styles from './HeaderApp.module.css';
import logoYou from './youtube.png'
import { useState } from "react";
import { useSelector } from 'react-redux';
import { Search } from '../search/Search';
import { selectScreenSize } from '../panScreenSize/panScreenSizeSlice'


export function HeaderApp() {
  const [settingsPromptClass, setSettingsPromptClass] = useState(styles.hide);
  const showSettingsPrompt = () =>  setSettingsPromptClass(styles.prompt);
  const hideSettingsPrompt = () =>  setSettingsPromptClass(styles.hide);
  const screenSize = useSelector(selectScreenSize)
  const calcContainerStyle=()=>{
    if (screenSize==='smallScreen' || screenSize=== 'bigScreen') {return mainContainer}
    if (screenSize==='fullScreen') {return hide}
  }

  const {
    mainContainer,
    hide,
  } = styles

  return (
    <div className={calcContainerStyle()} >

      <div  id = 'leftContainer' className={styles.leftContainer} >
        <button className={styles.sideBarBtn}> </button>
        <img src={logoYou} alt='logoYT' className={styles.logo} onClick={()=>window.location.reload()}/>
      </div>

      <div id='centralContainer' className={styles.centralContainer} >
        <Search/>
      </div>

      <div id='rightContainer' className={styles.rightContainer} >
        <button className={styles.settingsBtn}
                onMouseOver={showSettingsPrompt}
                onMouseLeave={hideSettingsPrompt}>
          <div className={settingsPromptClass}> Настройки </div>
        </button>
        <button className={styles.entryBtn}></button>
      </div>

    </div>
  );
}
