import React, {useState} from "react";
import styles from './controlPan.module.css'
import { DurationVideo } from "../durationVideo/DurationVideo"
import { CurrentTime } from "../currentTime/CurrentTime";
import { Volume } from '../volume/Volume'
import { TimeTrack } from "../timeTrack/TimeTrack";
import { SettingsMenu } from "../settingsMenu/SettingsMenu";


export function ControlPan (props) {

    
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

const togglePlayPause =()=> props.togglePlayPause()


  const subtitlesClass =  
    props.isSubtitles === true ? 
    styles.subtitlesOn 
    : styles.subtitlesOff
  
  const toggleAutoplay = () => {
    if (style.autoplay===styles.autoplayOff) {
      setStyle({...style, autoplay: styles.autoplayOn})
    } else if (style.autoplay===styles.autoplayOn) {
      setStyle({...style, autoplay: styles.autoplayOff})
    }
  }

  const toggleSettings = () => {
    if(style.settingsBtn===styles.settingsBtnOff){
      console.dir(11)
      setStyle({...style, 
                  settingsBtn: styles.settingsBtnOn,
                  settingsMenu: styles.show}) 
    } else if (style.settingsBtn===styles.settingsBtnOn){
      console.dir(22)
      setStyle({...style, 
                  settingsBtn: styles.settingsBtnOff,
                  settingsMenu: styles.hide}) 
    }
  }

  return (
    <div className={styles.controlPan}>
      <TimeTrack 
        currentTime = {props.currentTime}
        duration = {props.duration}
        setCurrentTime={props.setCurrentTime}
      />
      <div className={styles.flex}>
        <div className={styles.leftContainer}>
          <button 
            id='playPauseBtn'
            className={props.paused === true ? styles.play : styles.pause}
            onClick={togglePlayPause}          >
          </button>
          <button
            id='playNextBtn'
            className={styles.nextBtn}
            onClick={props.playNextVideo}
          >
          </button>
          <Volume
            muted = {props.muted}
            toggleMuted = {props.toggleMuted}
            setVolume = {props.setVolume}
            volume = {props.volume}
            duration={props.duration}
          />
          <CurrentTime 
            currentTime={props.currentTime}
          />
          <DurationVideo 
            duration={props.duration} 
          />
        </div>


        <div className={styles.rightContainer}>
          <button
            id='autoplayBtn'
            className={props.autoplay===true ? styles.autoplayOn : styles.autoplayOff}
            onClick={props.toggleAutoplay}          >
          </button>
          <button 
            className={subtitlesClass}
            onClick={props.toggleSubtitles}          >
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
            className={ props.wideScreen===false ? styles.wideScreen : styles.narrowScreen}
            onClick={props.toggleWideScreen}         >
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