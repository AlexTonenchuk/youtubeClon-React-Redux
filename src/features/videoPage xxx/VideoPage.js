import React from 'react';
import { useSelector } from 'react-redux'
import { selectScreenSize } from '../panScreenSize/panScreenSizeSlice';
import { Video } from '../video/Video';
import { VideoList } from '../videoList/VideoList';
import styles from './videoPage.module.css'
import { VideoFooter } from '../videoFooter/VideoFooter'

export function VideoPage (props) {
  const size = useSelector(selectScreenSize)

  // не надо возвращать кучу всего, работай со стилями

  return (
    <div>

      { size === 'smallScreen' ?
        <div className = {styles.flex} >
          <div>
            <Video location = 'inVideoPage' />
            <VideoFooter  />
          </div>
          <VideoList location = 'inVideoPage' />
        </div>
        : false
      }

      { size === 'bigScreen' ?
        <div className = {styles.noflex} >
          <Video location = 'inVideoPage' />
          <VideoList location = 'inVideoPage' />
        </div>
        : false
      }

    </div>
    
  )
}