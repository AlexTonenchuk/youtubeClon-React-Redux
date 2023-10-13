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
 } from "../videoList/videoListSlice";
 import {
  selectAutoplay,
 } from '../btnAutoplay/btnAutoplaySlice.js'




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
  const video = useSelector( (state)=> selectVideoFile(state, id) )
  const played = useSelector( (state)=> selectPlayed(state, id) )
  const mute = useSelector( (state)=> selectMute(state, id) )
  const volume = useSelector( (state)=> selectVolume(state, id)  )
  const specifiedTime = useSelector( (state)=> selectSpecifiedTime(state, id)  )
  const isSubtitles = useSelector( (state)=> selectIsSubtitles(state, id)  )
  const subtitles = useSelector( (state)=> selectSubtitles(state, id)  )
  const autoplayIsOn = useSelector( selectAutoplay)

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
      dispatch( playOn(Number(id)+1) )
      dispatch( muteOff(Number(id)+1) )
      navigate( '/video/'+(Number(id)+1) )
    }
  }
  const onTimeUpdate =(e)=> {
    const currentTime = Math.floor(e.target.currentTime)
    dispatch( writeCurrentTime({id, currentTime}) )
    // Важно! Это сброс (см. блок управления DOM-узлом)
    dispatch( setSpecifiedTime({id, specifiedTime: undefined}))
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



  // инициализация локального стейта UI (React), 
  // чтобы пропсами передать потомкам значения без андефайнед
  /* const [state, setState] = useState ({
    id: id,
    autoplay: false,      // указывает на: будет ли запускаться след.видео по окончанию
    isPlay: false,
    muted: false,
    volume: 0.5,          // 0...1
    isSubtitles: true,
    speed: 1,
    quality: 480,         // 360, 480, 720
    size: 'normal',       // normal, mini, wide, full - !!! ПЕРЕДЕЛАТЬ так, а не wideScreen !!!!!!!!!!!!!
    currentTime: 0,
    duration: 0,
    paused: true,
    wideScreen: false,
  }) */

  // по окончанию видео инкриментируем id для построения следущего <Video/>
 /*  const onEnded =()=>{
    setState((state)=>({...state, id: ++state.id}))
    setState((state)=>({...state, paused: true}))

  } */

  // обработчик событий, который в стейте постоянно обновляет 
  // текущее время ролика, которое нужно для <CurrentTime/>
/*     const changeCurrentTime =()=> {
      setState((state) =>(
        {...state, 
        currentTime: Math.floor(ref.current.currentTime)
        }
      ))
    }
 */

    

  //управление стилями <Video/> --- сделать понормальному т.е. styleState !
  let style
  if (location==='inListInMain'){
    style = styles.videoInListInMain
  } 
  if (location==='inListInVideoPage'){
    style = styles.videoInListInVideoPage
  }
  if (location==='inVideoPage'){
    style = styles.inVideoPage
  }
/*   if (state.wideScreen === true){       
    style = style+' '+styles.wideScreen
  } 
 */

  
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

