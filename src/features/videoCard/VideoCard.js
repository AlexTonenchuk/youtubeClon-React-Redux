import React from 'react'
import styles from './videoCard.module.css'
import { Caption } from '../caption/Caption'
import { Video } from '../video/Video'

export function VideoCard (props) {
  return (
    <div className={styles.videoCard}>
      <Video id = {props.id}/>
      <Caption id = {props.id}/>
    </div>
  )
}