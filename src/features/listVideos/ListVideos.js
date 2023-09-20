import React from 'react'
import { Video } from '../video/Video'
import { videoList } from '../../data/data';
import styles from './ListVideos.module.css'
import { Link } from 'react-router-dom';


export function ListVideos (props) {
  
  const location = props.location

  let style
  if (location==='inListInMain'){
    style=styles.videoListInVideoMainComponent
  } else {
    style=styles.videoList
  }

  // чтоб лучше читалось в пропсах у <Video/>
  const videoListLocation = location      

      const videos = videoList.map((item) => {
        return (
          <Link
            id={item.id}
            reloadDocument                        // Костыль !
            to={`/video/`+item.id}
            key={item.id}
            >
            <Video
              key={item.id}
              id = {item.id} 
              location={ videoListLocation === 'inVideoPage' ?
                        'inListInVideoPage'
                        : false
                        ||
                        videoListLocation === 'inMain' ?
                        'inListInMain'
                        : false }
            />
          </Link>
        )     
      });

  return (
    <div 
      className={style}>
      {videos}
    </div>
  )
}
