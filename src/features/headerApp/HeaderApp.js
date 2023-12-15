import React from 'react';
import styles from './HeaderApp.module.css';
import logoYou from './youtube.png'
import { useState } from "react";
import { Search } from '../search/Search';

export function HeaderApp() {
  const [settingsPromptClass, setSettingsPromptClass] = useState(styles.hide);
  const showSettingsPrompt = () =>  setSettingsPromptClass(styles.prompt);
  const hideSettingsPrompt = () =>  setSettingsPromptClass(styles.hide);
  return (
    <div className={styles.mainContainer} >

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
