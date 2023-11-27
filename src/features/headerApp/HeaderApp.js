import React from 'react';
import styles from './HeaderApp.module.css';
import logoYou from './youtube.png'
import { useState } from "react";
import { Search } from '../search/Search';

export function HeaderApp() {

  const [loupeClass, setLoupeClass] = useState(styles.loupeNoVisible);
  const [formClass, setFormClass] = useState(styles.formNoActive);
  const [settingsPromptClass, setSettingsPromptClass] = useState(styles.hide);
  const [microphonePromptClass, setMicrophonePromptClass] = useState(styles.hide);
  const [searchPromptClass, setSearchPromptClass] = useState(styles.hide);
  const [closeBtnClass, setcloseBtnClass] = useState(styles.hide);

  const showLoupe = () => {
    setLoupeClass( styles.loupeVisible);
    setFormClass( styles.formActive);
  };
  const hideLoupe = () => {
    setLoupeClass(styles.loupeNoVisible);
    setFormClass(styles.formNoActive);
  };
  const showSettingsPrompt = () => {
    setSettingsPromptClass(styles.prompt);
  }
  const hideSettingsPrompt = () => {
    setSettingsPromptClass(styles.hide);
  }
  const showMicrophonePrompt = () => {
    setMicrophonePromptClass(styles.prompt);
  }
  const hideMicrophonePrompt = () => {
    setMicrophonePromptClass(styles.hide);
  }
  const showSearchPrompt = () => {
    setSearchPromptClass(styles.prompt);
  }
  const hideSearchPrompt = () => {
    setSearchPromptClass(styles.hide);
  }


  const showCloseBtn = (e) => {
    console.dir(e.target.value.length)
    if (e.target.value.length > 0){
      setcloseBtnClass(styles.closeBtnVisible)
    } else {setcloseBtnClass(styles.hide)}
  }



  return (
    <div className={styles.mainContainer} >

      <div  className={styles.leftContainer} 
            id = 'leftContainer'>
        <button className={styles.sideBarBtn}></button>
        <img src={logoYou} alt='logoYT' className={styles.logo}></img>
      </div>

      <div  className={styles.centralContainer}
            id='centralContainer'>
        <Search/>

      </div>

      

      <div className={styles.rightContainer} id='rightContainer'>
        <button className={styles.settingsBtn}
                onMouseOver={showSettingsPrompt}
                onMouseLeave={hideSettingsPrompt}>
          <div className={settingsPromptClass}> Настройки</div>
        </button>
        <button className={styles.entryBtn}></button>
      </div>

    </div>
  );
}
