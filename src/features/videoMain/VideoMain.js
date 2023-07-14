import React, {useRef, useState} from "react";
import { ControlPan } from '../controlPan/ControlPan'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectVideoById } from '../listVideos/listVideosSlice'
import styles from './videoMain.module.css'

export function VideoMain () {

    const id = useParams().id
    const videoData = useSelector((state) => selectVideoById(state, id))
    
    /* Это костыль наверное. Не знаю как правильно решить проблему конфликта: 
    "video элемент загружается асинхронно, а ссылку на него передаем в компонент
    ControlPan синхронно".
    Поэтому использую useState таким образом:
    Сначала рендерится компонент  VideoMain, он внутри себя синхронно рендерит 
    компонент  ControlPan с пустой сылкой на video элемент, затем video 
    элемент  доконца дозагружается и срабатывает обработчик onLoadedMetadata, 
    который в локальном стейте обновляет ссылку на video элемент, соответственно
    происходит перерендер VideoMain и => ControlPan уже с обновленной ссылкой 
    на video элемент
    */
    const ref = useRef()
    const [videoRef, setVideoRef] = useState('video until loaded')
    const updateVideoRef = () =>  setVideoRef(ref)
    return (
        <div className={styles.videoMain}>
            <video  
                ref={ref}
                onLoadedMetadata={updateVideoRef}     >
                <source src={videoData.video}/>
                <track  
                    kind="subtitles" 
                    src={videoData.subtitles}
                    srcLang="ru"
                    default   
                    label="Русский"    >
                </track>
            </video>
            <ControlPan video={videoRef.current}  />
        </div>    
    )
} 

