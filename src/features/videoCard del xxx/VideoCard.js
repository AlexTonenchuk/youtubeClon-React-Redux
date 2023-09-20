import React, { useRef, useState } from 'react'
import styles from './videoCard.module.css'
import { Caption } from '../caption/Caption'
import { selectVideoById } from '../listVideos/listVideosSlice'
import { useSelector } from 'react-redux'
import { DurationVideo } from '../durationVideo/DurationVideo'
import { Link, useLocation } from 'react-router-dom';
import { Video } from '../video/Video'

export function VideoCard (props) {
  const videoRef = useRef()
  const [duration, setDuration] = useState('')
  const putVideoDurationInState = () => {
    setDuration(videoRef.current.duration)
  }
  const videoData = useSelector((state) => {
    return selectVideoById(state, props.id)
  })

  let style
  if (props.isInMain){
    style = styles.verticalCard
  } else if (props.isInListInVideoPage){
    style = styles.horizontalCard
  }

  
  
  return (
    <div 
      className={style}>
      <Link  
        reloadDocument to={`/video/`+props.id}>
        <div className={styles.video}>
          <Video 
            id={props.id}
            isInMain={props.isInMain}
            isInListInVideoPage={props.isInListInVideoPage}
            poster={videoData.poster}
          />
{/*           <DurationVideo duration={duration}/>
 */}        </div>
      </Link>
                                              {/* КОМПОНЕНТ */}
      <Caption 
        id = {props.id}
        isInListInVideoPage={props.isInListInVideoPage}
      />
    </div>
  )
}