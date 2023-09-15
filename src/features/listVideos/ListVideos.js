import React from 'react'
import { VideoCard } from '../videoCard/VideoCard'
import { videoList } from '../../data/data';
import styles from './ListVideos.module.css'


export function ListVideos (props) {
  let style
  if (props.isInVideoMain){
    style=styles.videoListInVideoMainComponent
  } else {
    style=styles.videoList
  }
    const videos = videoList.map((item) => {
      return (
        <VideoCard 
          id = {item.id} 
          key={item.id} 
          isInMain={props.isInMain}
          isInListInVideoPage={props.isInListInVideoPage}
        />
      )     
    });

  return (
    <div 
      className={style}>
      {videos}
    </div>
  )
}
