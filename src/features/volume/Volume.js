import React from 'react'
import styles from './volume.module.css'

export function Volume (props) {

    const onChangeVolume = (e) => props.setVolume(e.target.value/10)

    return (
        <div>
            <button 
                className={props.muted === true ? styles.soundOff : styles.soundOn}
                onClick={props.toggleMuted}          >
            </button>

            <input 
                className={styles.volume}
                type="range" 
                id="volume" 
                name="volume"
                min="0" 
                max="10"
                value={`${props.volume*10}`}
                onChange={onChangeVolume}
            />
        </div>
    )
}