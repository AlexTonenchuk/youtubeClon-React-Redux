import React from "react";
import styles from './btnMiniPlayer.module.css'
import { useState } from "react";

export function BtnMiniPlayer () {

  const [promptClass, setPromptClass] = useState(styles.hide)

  const showPrompt = () => setPromptClass(styles.prompt) 
  const hidePrompt = () => setPromptClass(styles.hide) 


  // RETURN:
  return (
    <div>
      <button 
        id='miniPlayer' 
        className={ styles.miniPlayer }
        onMouseOver={showPrompt}
        onMouseLeave={hidePrompt}
      >
        <div className={promptClass}> Временно не работает</div>

      </button>
    </div>
  )
}