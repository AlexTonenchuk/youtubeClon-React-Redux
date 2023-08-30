import React, { useRef, useState } from 'react'
import styles from './videoCard.module.css'
import { Caption } from '../caption/Caption'
import { selectVideoById } from '../listVideos/listVideosSlice'
import { useSelector } from 'react-redux'
import { DurationVideo } from '../durationVideo/DurationVideo'
import { Link } from 'react-router-dom';


export function VideoCard (props) {
  const videoRef = useRef()
  const [duration, setDuration] = useState('')
  const putVideoDurationInState = () => {
    setDuration(videoRef.current.duration)
  }
  const videoData = useSelector((state) => {
    return selectVideoById(state, props.id)
  })
  return (
    <div className={styles.videoCard}>
      <Link  
        reloadDocument to={`/video/`+props.id}>
        <div className={styles.video}>
          <video  
            ref={videoRef}
            poster={videoData.poster} 
            onLoadedMetadata={putVideoDurationInState}>
            <source src={videoData.video}/>
            <track  
              kind="subtitles" 
              src={videoData.subtitles}
              srcLang="ru"
              default   
              label="Русский">
            </track>
          </video>
          <DurationVideo duration={duration}/>
        </div>
      </Link>
                                          {/* КОМПОНЕНТ Caption*/}
      <Caption id = {props.id}/>
    </div>
  )
}