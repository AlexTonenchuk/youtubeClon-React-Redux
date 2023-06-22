import React from 'react';
import styles from './HeaderApp.module.css';
import logoYou from './youtube.png'
import { useState } from "react";

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



  /*    window.addEventListener('resize', (e)=>{
    let left= document.querySelector(`#leftContainer`)
    let right = document.querySelector('#rightContainer')
    let central = document.querySelector('#centralContainer')
    let marg = e.target.innerWidth-left.clientWidth-right.clientWidth-central.clientWidth
    //if (marg<40) {document.querySelector(`form`).className=styles.hide}
    if (marg>40) {document.querySelector(`form`).className=""}
    console.dir(document.querySelector(`form`))
  })
 */ 

  return (
    <div className={styles.mainContainer} >

      <div  className={styles.leftContainer} 
            id = 'leftContainer'>
        <button className={styles.sideBarBtn}></button>
        <img src={logoYou} alt='logoYT' className={styles.logo}></img>
      </div>

      <div  className={styles.centralContainer}
            id='centralContainer'>

        <form className={formClass} >
          <div className={loupeClass}></div>
          <input  type="text" 
                  className={styles.searchLine} 
                  placeholder='Введите запрос'
                  onFocus={showLoupe}
                  onBlur={hideLoupe}
                  onChange={showCloseBtn}/>
          <button className = {styles.keyboardBtn}></button>
          <button className = {closeBtnClass}></button>
        </form>

        <button className={styles.searchBtn}
                onMouseOver={showSearchPrompt}
                onMouseLeave={hideSearchPrompt}>
          <div className={searchPromptClass}> Введите запрос</div>
        </button>

        <button className={styles.microphoneBtn}
                onMouseOver={showMicrophonePrompt}
                onMouseLeave={hideMicrophonePrompt}>
          <div className={microphonePromptClass}> Голосовой поиск</div>
        </button>

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
