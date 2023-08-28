import React, {useState} from "react";
import styles from './controlPan.module.css'
import { DurationVideo } from "../durationVideo/DurationVideo"
import { CurrentTime } from "../currentTime/CurrentTime";
import { Volume } from '../volume/Volume'
import { TimeTrack } from "../timeTrack/TimeTrack";
import { SettingsMenu } from "../settingsMenu/SettingsMenu";


export function ControlPan (props) {
    
    const [classes, setClasses] = useState({
        play: styles.play,
        mute: styles.soundOned,
        autoplay: styles.autoplayOff,
        settingsBtn: styles.settingsBtnOff,
        settingsMenu: styles.hide,
        miniPlayer: styles.miniPlayer,
        wideScreen: styles.wideScreen,
        fullScreen: styles.fullScreen
    })

    const togglePlayPause =()=>{
        if(props.paused === true){
            props.togglePlayPause()
            setClasses({...classes, play: styles.pause}); 
        } else if (props.paused === false){
            //video.ontimeupdate=null
            props.togglePlayPause()
            setClasses({...classes, play: styles.play}); 
        }
    }

    const playNext=()=>{
        console.dir('is click on playNext')
    }

    const subtitlesClass =  
        props.isSubtitles === true ? 
        styles.subtitlesOn 
        : styles.subtitlesOff
    
    const toggleAutoplay = () => {
        if (classes.autoplay===styles.autoplayOff) {
            setClasses({...classes, autoplay: styles.autoplayOn})
        } else if (classes.autoplay===styles.autoplayOn) {
            setClasses({...classes, autoplay: styles.autoplayOff})
        }
    }

    const toggleSettings = () => {
        if(classes.settingsBtn===styles.settingsBtnOff){
            console.dir(11)
            setClasses({...classes, 
                        settingsBtn: styles.settingsBtnOn,
                        settingsMenu: styles.show}) 
        } else if (classes.settingsBtn===styles.settingsBtnOn){
            console.dir(22)
            setClasses({...classes, 
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
                        className={classes.play}
                        onClick={togglePlayPause}          >
                    </button>
                    <button 
                        className={styles.nextBtn}
                        onClick={playNext}            >
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
                        className={classes.autoplay}
                        onClick={toggleAutoplay}          >
                    </button>
                    <button 
                        className={subtitlesClass}
                        onClick={props.toggleSubtitles}          >
                    </button>
                    <button 
                        className={classes.settingsBtn}
                        onClick={toggleSettings}          >
                    </button>
                    <button 
                        className={classes.miniPlayer}         >
                    </button>
                    <button 
                        className={classes.wideScreen}
                        onClick={props.toggleWideScreen}         >
                    </button>
                    <button 
                        className={classes.fullScreen}         >
                    </button>
                </div>
            </div>
            <SettingsMenu 
                className={classes.settingsMenu}
            />
        </div>
    )
}