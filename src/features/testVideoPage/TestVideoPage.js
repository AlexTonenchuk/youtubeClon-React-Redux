import React, { useRef, useState } from 'react'
import { selectVideoById } from '../listVideos/listVideosSlice'
import { useSelector } from 'react-redux'
import { DurationVideo } from '../durationVideo/DurationVideo'
import { useParams } from 'react-router-dom'
import styles from './testVideoPage.module.css'


export function TestVideoPage () {
    const id = useParams().id
    const videoRef = useRef()
    const [duration, setDuration] = useState('')
    const putVideoDurationInState = () =>{
        setDuration(videoRef.current.duration)
        console.dir(videoRef.current)
    }
    const videoData = useSelector((state) => {
        return selectVideoById(state, id)
    })
  
  return (
    <div className={styles.video}>
        <video  
            ref={videoRef}
            poster={videoData.poster} 
            onLoadedMetadata={putVideoDurationInState}
            controls
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
        <DurationVideo duration={duration}/>
    </div>
  )
}




