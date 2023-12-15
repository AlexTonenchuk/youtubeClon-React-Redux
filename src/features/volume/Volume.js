import React from 'react'
import styles from './volume.module.css'
import { useSelector, useDispatch } from "react-redux";
import { 
    muteOn, 
    muteOff,
    toggleMute,
    setVolume,
    selectVolume,
    selectMute
  } from "../videoList/videoListSlice";
  

export function Volume (props) {

    const id = props.id
    const dispatch = useDispatch()
    const volume = useSelector( (state)=> selectVolume(state, id) )
    const isMute = useSelector( (state)=> selectMute(state, id) )
    const changeVolume = (e) => {
        const volume = e.target.value/10
        dispatch( setVolume({id, volume}) )
    }

    const {
        sound,
        soundOff,
        soundOn,
    } = styles

    return (
        <div className={styles.container}>
            <button 
                className = { sound+' '+(isMute === true ? soundOff : soundOn) }
                onClick = { ()=> dispatch( toggleMute(id) ) }          >
            </button>

            <input 
                className = { styles.volume }
                type="range" 
                id="volume" 
                name="volume"
                min="0" 
                max="10"
                value = { `${volume*10}` }
                onChange = { changeVolume }
            />
        </div>
    )
}