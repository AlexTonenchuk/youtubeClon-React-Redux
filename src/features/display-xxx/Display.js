import React, {useRef} from "react";
import styles from './display.modules.css'
import { selectVideoById } from '../listVideos/listVideosSlice'
import { useSelector } from 'react-redux'


export function Display (props) {

    const videoRef = useRef()
    const videoData = useSelector((state) => {
        return selectVideoById(state, props.id)
    })
    

    return (
        <div className={styles.display}>
                <video  
                    ref={videoRef}
                >
                    <source src={videoData.video}/>
                    <track  
                        kind="subtitles" 
                        src={videoData.subtitles}
                        srcLang="ru"
                        default   
                        label="Русский"
                    >
                    </track>
                </video>

        </div>
    )
}


