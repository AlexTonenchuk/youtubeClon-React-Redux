import React, {useState} from "react";
import styles from './controlPan.module.css'
import { DurationVideo } from "../durationVideo/DurationVideo"
import { CurrentTime } from "../currentTime/CurrentTime";


export function ControlPan (props) {
    console.dir('render CONTROL-PAN')
    const video = props.video

    const [classes, setClasses] = useState({
        play: styles.play,
        mute: styles.soundOned
    })

    const play =()=>{
        if(video && classes.play === styles.play){
            video.play()
            setClasses({...classes, play: styles.pause}); 
        } else if (video && classes.play === styles.pause){
            video.ontimeupdate=null
            video.pause()
            setClasses({...classes, play: styles.play}); 
        }
    }

    const muteToggle =(e)=>{
        if(video && classes.mute === styles.soundOned){
            video.muted=true
            setClasses({...classes, mute: styles.soundOffed})
        } else if (video && classes.mute === styles.soundOffed){
            video.muted=false
            setClasses({...classes, mute: styles.soundOned})
        }
    }

    const playPrevios=()=>{
        console.dir('is click on playPrevios')
    }
    
    const playNext=()=>{
        console.dir('is click on playNext')
    }

    return (
        <div className={styles.controlPan}>
            <button 
                className={styles.previosBtn}
                onClick={playPrevios}             >
            </button>

            <button 
                className={classes.play}
                onClick={play}                >
            </button>

            <button 
                className={styles.nextBtn}
                onClick={playNext}            >
            </button>

            <button 
                className={classes.mute}
                onClick={muteToggle}          >
            </button>

           < CurrentTime video = {video} />

            <DurationVideo video={video} />
        </div>
    )
}