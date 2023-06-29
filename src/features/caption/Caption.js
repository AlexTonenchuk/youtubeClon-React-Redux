import React from 'react'
import { useSelector } from 'react-redux'
import styles from './caption.module.css'
import { selectVideoById } from '../listVideos/listVideosSlice'
import { DateVideo } from '../dateVideo/DateVideo'
import { IconCanal } from '../iconCanal/IconCanal'
import { Link } from 'react-router-dom';



export function Caption (props) {
    const videoData = useSelector((state) => {
        return selectVideoById(state, props.id)
      })
    return (
        <div className={styles.rowFlexContainer}>
            
                <div className={styles.container}>
                    <IconCanal id = {props.id}/>
                </div> 
            
            <div className={styles.rightContainer}>
                <div className={styles.name}>   {videoData.name}      </div>
                <div className={styles.rowFlexContainer}>
                    <div className={styles.canalName}>  {videoData.canal}   </div>
                    <div className={styles.verify}> </div>
                </div>
                <div className={styles.rowFlexContainer}>
                    <div className={styles.views}> 
                        {`${videoData.views} просмотров`} 
                    </div>
                    <div className={styles.verify}> </div>
                    <DateVideo creatDate={videoData.creatDate}/>
                </div>
            </div>
      </div>
    )
}




/* export function Caption (props) {
    const videoData = useSelector((state) => {
        return selectVideoById(state, props.id)
      })
    return (
        <div className={styles.caption}>
            <div className={styles.leftCaption}>     </div>
            <div className={styles.rightCaption}>
                <div className={styles.title}>   {videoData.name}      </div>
                <div className={styles.canal}>
                    <div className={styles.canalName}>  {videoData.canal}   </div>
                    <div className={styles.verify}> </div>
                </div>
                <div className={styles.metaData}>
                    <div className={styles.views}> 
                        {`${videoData.views} просмотров`} 
                    </div>
                    <div className={styles.dot}> 
                    </div>
                    <DateVideo creatDate={videoData.creatDate}/>
                </div>
            </div>
      </div>
    )
} */