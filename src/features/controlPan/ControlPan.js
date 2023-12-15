import React, {useState} from "react";
import styles from './controlPan.module.css'
import { Time } from "../time/Time"
import { Volume } from '../volume/Volume'
import { TimeTrack } from "../timeTrack/TimeTrack";
import { BtnSettings } from "../btnSettings/BtnSettings"; 
import { BtnAutoplay } from "../btnAutoplay/BtnAutoplay";
import { BtnPlayNext } from "../btnPlayNext/BtnPlayNext";
import { BtnSubtitles } from "../btnSubtitles/BtnSubtitles";
import { PanScreenSize } from "../panScreenSize/PanScreenSize";
import { useSelector, useDispatch } from "react-redux";
import { 
  muteOn, 
  muteOff, 
  setVolume,
  togglePlay, 
  selectPlayed,
  selectVolume,
} from "../videoList/videoListSlice";

export function ControlPan (props) {

  const id = props.id
  const dispatch = useDispatch()
  const played = useSelector( (state)=> selectPlayed(state, id) )
/*   const volume = useSelector( (state)=> selectVolume(state, id) )
 */

  //обработчики событий
  const togglePlayPause =()=> {
    dispatch( togglePlay(id) )
    dispatch( muteOff(id) )
  }


  // стейт стилей компонента
/*   const [style, setStyle] = useState({
    mute: styles.soundOned,
    autoplay: styles.autoplayOff,
    settingsBtn: styles.settingsBtnOff,
    settingsMenu: styles.hide,
    miniPlayer: styles.miniPlayer,
    wideScreenBtn: styles.widthScreen,
    fullScreen: styles.fullScreen
  })
 */
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
              <BtnPlayNext/>
              <Volume id = {id} />
              <Time id = {id} />
            </div>
          
            <div className={styles.rightContainer}>
              <BtnAutoplay/>
              <BtnSubtitles id={id}/>
              <BtnSettings/>
              <PanScreenSize/>
            </div>
        </div>
  </div>
    )
}