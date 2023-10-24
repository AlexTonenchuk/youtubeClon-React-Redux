import React, {useRef, useState, useEffect} from "react";
import { ControlPan } from '../controlPan/ControlPan'
import { Caption} from '../caption/Caption'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styles from './video.module.css'
import { 
  playOn, 
  playOff,
  muteOn,
  muteOff,
  writeCurrentTime,
  setSpecifiedTime,
  writeDuration,
  selectDuration,
  selectIsSubtitles,
  selectSubtitles,
  selectVideoFile, 
  selectPlayed,
  selectMute,
  selectVolume,
  selectSpecifiedTime,
 } from "../videoList/videoListSlice"
import {  selectAutoplay } from '../btnAutoplay/btnAutoplaySlice.js'
import { selectScreenSize } from "../btnScreenSize/btnScreenSizeSlice";
import { selectPlayNext, setPlayNext } from "../btnPlayNext/btnPlayNextSlice";
import { selectSpeed } from "../speedMenu/speedMenuSlice";



export function Video (props) {

  const ref = useRef()
  const dispatch = useDispatch()
  const location = props.location
  const urlId = useParams().id
  /* 
  из пропсов id берется для видеороликов
  внутри списка, а из url для главного видео
  */
  const id = props.id ? props.id : urlId
  const navigate = useNavigate()

  // извлечение значений из ReduxState
  const video =         useSelector( (state)=> selectVideoFile(state, id) )
  const played =        useSelector( (state)=> selectPlayed(state, id) )
  const mute =          useSelector( (state)=> selectMute(state, id) )
  const volume =        useSelector( (state)=> selectVolume(state, id)  )
  const specifiedTime = useSelector( (state)=> selectSpecifiedTime(state, id)  )
  const isSubtitles =   useSelector( (state)=> selectIsSubtitles(state, id)  )
  const subtitles =     useSelector( (state)=> selectSubtitles(state, id)  )
  const autoplay =      useSelector( selectAutoplay)
  const screenSize =    useSelector( selectScreenSize)
  const playNext =      useSelector( selectPlayNext)
  const speed =         useSelector( selectSpeed )

  // БЛОК УПРАВЛЕНИЯ DOM-узлом
  /* 
  БЛОК УПРАВЛЕНИЯ DOM-узлом <video> читает 
  значения из ReduxState и управляет узлом.
  Схема управления временем видео слудующая: 
  пользователь -> specifiedTime -> ref (DOM) -> currentTime -> UI.
  После любой перемотки времени, как только видео 
  начинает играть происходит сброс specifiedTime в
  обработчике onTimeUpdate - чтобы никакой rerender <video>
  не повторил перемотку времени.
  */
  useEffect( ()=>{
    if (played === true) {
      ref.current.play()
    } else if (played === false) {
      ref.current.pause()
    }
    ref.current.volume = volume
    if (mute === true) {
      ref.current.volume = 0
    } else {
      ref.current.volume = volume
    }
    if (specifiedTime !== undefined){           
      ref.current.currentTime = specifiedTime
      dispatch( setSpecifiedTime({id, specifiedTime: undefined})) 
    }
    if (location === 'inVideoPage' && playNext === true) {
      dispatch( playOff(id) )
      dispatch( setPlayNext(false) )
      navigate( '/video/'+(Number(id)+1) )
    }
    // !!!!!! ИСПРАВиТЬ
    // будет срабатывать при каждом эффекте, это нагрузит процессор
    // нужно блок управления разбить на отдельные эффекты, зависящие
    // от изменения конкретных частей ReduxState
    if (true) {
      ref.current.playbackRate = speed
    }
  })

  //ОБРАБОТЧКИ
  const onMouseOver =()=> {
    if (location==='inListInVideoPage' || location==='inListInMain'){
      dispatch( playOn(id) );
      dispatch( muteOn(id) )
    }
  }
  const onMouseOut =()=> {
    if (location==='inListInVideoPage' || location==='inListInMain'){
      dispatch( playOff(id) );
      dispatch( muteOn(id) )
    }
  }
  const onEnded =()=> {
    dispatch( playOff(id) )
    dispatch( setSpecifiedTime({id, specifiedTime:0}))
    if (location === 'inVideoPage'){
      navigate( '/video/'+(Number(id)+1) )
      dispatch( muteOff(Number(id)+1) )
      if(autoplay===true){
        dispatch( playOn(Number(id)+1) )
      }
    }
  }
  const onTimeUpdate =(e)=> {
    const currentTime = Math.floor(e.target.currentTime)
    dispatch( writeCurrentTime({id, currentTime}) )
  }
  const onClick =()=> {
    if (location==='inListInVideoPage' || location==='inListInMain'){
      dispatch ( setSpecifiedTime({id, specifiedTime:0}) )
      dispatch( writeCurrentTime({id, currentTime:0}) )
      dispatch (playOff(id))
      dispatch( muteOn(id) )
    }
  }
  /* 
  после прогрузки в стейт перезаписываются, 
  асинхронно сформированные в элементе video, значения 
   */
  const onLoadedMetadata = () => {
    const duration = Math.floor(ref.current.duration)
    dispatch( writeDuration({id, duration}))
  } 
   

  //управление стилями <Video/> --- сделать понормальному т.е. styleState !
  let style

  if (location==='inListInMain'){
    style = styles.videoInListInMain
  } 
  if (location==='inListInVideoPage'){
    style = styles.videoInListInVideoPage
  }
  if (location==='inVideoPage' && screenSize === 'small'){
    style = styles.videoInPageSmallScreen
  }
  if (location==='inVideoPage' && screenSize === 'large'){       
    style = styles.videoInPageLargeScreen
  } 

  
  // UI
  return (
    <div >
      <div className ={ location==='inVideoPage' ? styles.flex : 'false' } >
        <div className ={ location==='inListInVideoPage' ? styles.flex : 'false' } >
          
          <video
            id = {id}
            key = {id}
            className = {style}
            ref = {ref}
            onLoadedMetadata = {onLoadedMetadata}
            onTimeUpdate = {onTimeUpdate }
            onMouseOver = { onMouseOver }
            onMouseOut = { onMouseOut }
            onClick = { onClick }
            onEnded = { onEnded }
            /*  poster = {videoData.poster} */   >
            <source src={video}/>
            { isSubtitles === true ? 
                <track
                  kind = 'subtitles'
                  src = { subtitles } 
                  srcLang="ru"
                  default   
                  label="Русский"    
                />
              : false
            }
          </video>
        
          { location==='inVideoPage' ?            // location для Video
            <ControlPan id = {id} />
            : false
          }

{/*           { location==='inListInMain' ||        // location для Video
            location==='inListInVideoPage' ?
            <Caption location={props.location}/>
            : false
          }
 */}
        </div>

      </div>
      </div>
  )
} 

