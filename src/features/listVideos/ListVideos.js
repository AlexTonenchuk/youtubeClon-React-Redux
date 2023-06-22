import React from 'react'
import { VideoCard } from '../videoCard/VideoCard'
import { videoList } from '../../data/data';
import styles from './ListVideos.module.css'


export function ListVideos () {
      const videos = videoList.map((item) => {
        return (
          <VideoCard id = {item.id} key={item.id}/>
        )     
      });
  return (
    <div className={styles.videoList}>
      {videos}
    </div>
  )
}
