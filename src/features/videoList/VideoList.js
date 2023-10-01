import React from 'react'
import { Video } from '../video/Video'
import { videoList } from '../../data/data';
import styles from './videoList.module.css'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export function VideoList (props) {
  
  const location = props.location
  const urlId = useParams().id

  let style
  if (location==='inMain'){
    style=styles.inMain
  } 
  if (location==="inVideoPage") {
    style=styles.inVideoPage
  }

      const videos = videoList.map((item) => {
        if ( !(`${item.id}` === urlId)){
          return (
            <Link
              id = {`${item.id}`} 
              reloadDocument                        // Костыль !!!!!!!!!!   !!!!!!!!!!    !!!!!!!!!!
              to = {`/video/`+item.id}
              key = {item.id} >
  
              <Video
                key={item.id}
                id = {`${item.id}`} 
                location = { location==='inVideoPage' ? 'inListInVideoPage' : false
                              ||
                            location==='inMain' ? 'inListInMain' : false
                }
              />
            </Link>
          )     
        } else {
          return false
        }
      });

  return (
    <div 
      className={style}>
      {videos}
    </div>
  )
}
