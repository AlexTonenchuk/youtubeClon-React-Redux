import React, {useState} from "react";
import styles from './controlPan.module.css'
import { Time } from "../time/Time"
import { Volume } from '../volume/Volume'
import { TimeTrack } from "../timeTrack/TimeTrack";
import { SettingsMenu } from "../settingsMenu/SettingsMenu";
import { BtnAutoplay } from "../btnAutoplay/BtnAutoplay";
import { useSelector, useDispatch } from "react-redux";
import { 
  muteOn, 
  muteOff, 
  setVolume,
  togglePlay, 
  selectPlayed,
  selectVolume,
  toggleSubtitles,
  selectIsSubtitles
} from "../videoList/videoListSlice";

export function ControlPan (props) {

  const id = props.id
  const dispatch = useDispatch()
  const played = useSelector( (state)=> selectPlayed(state, id) )
  const volume = useSelector( (state)=> selectVolume(state, id) )
  const isSubtitles = useSelector( (state)=> selectIsSubtitles(state, id)  )


  //обработчики событий
  const togglePlayPause =()=> {
    dispatch( togglePlay(id) )
    dispatch( muteOff(id) )
  }


  // стейт стилей компонента
  const [style, setStyle] = useState({
    mute: styles.soundOned,
    autoplay: styles.autoplayOff,
    settingsBtn: styles.settingsBtnOff,
    settingsMenu: styles.hide,
    miniPlayer: styles.miniPlayer,
    wideScreenBtn: styles.widthScreen,
    fullScreen: styles.fullScreen
  })

  const subtitlesClass =  
    isSubtitles === true ? 
    styles.subtitlesOn 
    : styles.subtitlesOff
  
/*   const toggleAutoplay = () => {
    if (style.autoplay===styles.autoplayOff) {
      setStyle({...style, autoplay: styles.autoplayOn})
    } else if (style.autoplay===styles.autoplayOn) {
      setStyle({...style, autoplay: styles.autoplayOff})
    }
  }
 */
  const toggleSettings = () => {
    if(style.settingsBtn===styles.settingsBtnOff){
      setStyle({...style, 
                  settingsBtn: styles.settingsBtnOn,
                  settingsMenu: styles.show}) 
    } else if (style.settingsBtn===styles.settingsBtnOn){
      setStyle({...style, 
                  settingsBtn: styles.settingsBtnOff,
                  settingsMenu: styles.hide}) 
    }
  }



  return (
    <div className={styles.controlPan}>
       <TimeTrack id = {id} />
       <div className={styles.flex}>
        <div className={styles.leftContainer}>
          <button 
            id='playPauseBtn'
            className={played === true ? styles.pause : styles.play }
            onClick={ togglePlayPause }          
            >
          </button>
          <button
            id='playNextBtn'
            className={styles.nextBtn}
/*             onClick={props.playNextVideo}
 */          >
          </button>
          <Volume id = {id} />
          <Time id = {id} />
        </div>

        <div className={styles.rightContainer}>
          <BtnAutoplay/>

{/*           <button
            id='autoplayBtn'
            className={props.autoplay===true ? styles.autoplayOn : styles.autoplayOff}
            onClick={props.toggleAutoplay}          
          >
          </button>
 */}          
          <button
            className={subtitlesClass}
            onClick={ ()=> dispatch(toggleSubtitles(id)) }

/*             
 *//*                       
 */            >
          </button>
          <button 
            className={style.settingsBtn}
            onClick={toggleSettings}          >
          </button>
          <button 
            className={style.miniPlayer}         >
          </button>
          <button
            id='wideScreen'
/*             className={ props.wideScreen===false ? styles.wideScreen : styles.narrowScreen}
            onClick={props.toggleWideScreen}         
 */            >
          </button>
          <button 
            className={style.fullScreen}         >
          </button>
        </div>
      </div>
        <SettingsMenu 
          className={style.settingsMenu}
        />
    </div>
    )
}