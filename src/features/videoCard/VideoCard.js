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







/* export function VideoCard (props) {
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
      <div className = {styles.screen}> 
        <video  ref={videoRef}
                poster={videoData.poster} 
                onLoadedMetadata={putVideoDurationInState}
                onClick={(e)=>console.dir(e.target)}
                controls
        >
          <source src={videoData.video}/>
          <track  kind="subtitles" 
                  src={videoData.subtitles}
                  srcLang="ru"
                  default   
                  label="Русский"
          >
          </track>
        </video>
        <DurationVideo duration={duration}/>
      </div>
      <div className={styles.caption}>
        <div className={styles.leftCaption}> </div>
        <div className={styles.rightCaption}>
            <div className={styles.title}>{videoData.name}</div>
            <div className={styles.canal}>
              <div className={styles.canalName}> {videoData.canal} </div>
              <div className={styles.verify}> </div>
            </div>
            <div className={styles.metaData}>
                <div className={styles.views}> {`${videoData.views} просмотров`} </div>
                <div className={styles.dot}> </div>
                <DateVideo creatDate={videoData.creatDate}/>
            </div>
        </div>
      </div>
  </div>
  )
} */

/* 
export const videoList = [
    { 
        id: 2, 
        video: v2, 
        name: 'Iron Maiden - The Trooper', 
        canal: 'Metall', 
        creatDate: '2023.06.01', 
        views: 1, 
        isVerificated: true, 
        categories: ['Животные', 'Война', 'Музыка', 'Живое выступление'] 
    },
    {
        id:3, 
        video: v3,
        name: 'Metallica - Whiskey In The Jar', 
        canal:'Metall', 
        creatDate: '2023.06.01', 
        views: 1, 
        isVerificated: true, 
        categories: ['Загородная жизнь', 'Дом', 'Музыка'] 
    },
 */