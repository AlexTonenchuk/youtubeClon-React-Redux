import React, { useRef, useState } from 'react'
import styles from './video.module.css'
import { selectVideoById } from '../listVideos/listVideosSlice'
import { useSelector } from 'react-redux'
import { DurationVideo } from '../durationVideo/DurationVideo'

export function Video (props) {
  
  const videoRef = useRef()
  const [duration, setDuration] = useState('')
  const putVideoDurationInState = () =>{
    setDuration(videoRef.current.duration)
    console.dir(videoRef.current)
  }
  const videoData = useSelector((state) => {
    return selectVideoById(state, props.id)
  })
  
  return (
    <div className={styles.video}>
        <video  
            ref={videoRef}
            poster={videoData.poster} 
            onLoadedMetadata={putVideoDurationInState}
            onClick={(e)=>console.dir(e.target)}
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
