import React from "react";
import styles from './time.module.css'
import { selectCurrentTime, selectDuration} from "../videoList/videoListSlice";
import { useSelector } from 'react-redux'


export function Time (props) {
  const id = props.id
  const currentTime = useSelector( (state)=> selectCurrentTime(state, id) )
  const duration = useSelector( (state)=> selectDuration(state, id) )
  // красиво как а!
  const changeTimeFormat =(seconds)=>{
    let hhmmss, s, m, h, ss, mm, hh 
    s = seconds%60
    m = (seconds-s)/60%60
    h = (seconds-m*60-s)/3600%60
    ss = s<10 ? ('0'+s) : s
    mm = m> 0 ? (m+':') : '00:'
    hh = h> 0 ? (h+':') : ''
    hhmmss = `${hh}${mm}${ss}`
    return hhmmss
  }
  return (
    <div className={styles.durationVideo}> 
      {changeTimeFormat(currentTime)+'/'+changeTimeFormat(duration)} 
    </div>
  )
}