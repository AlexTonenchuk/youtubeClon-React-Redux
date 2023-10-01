import React, {useRef, useState} from "react";
import { ControlPan } from '../controlPan/ControlPan'
import { Caption} from '../caption/Caption'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
/* import { selectPaused, setFocusId, selectFocusId } from "./videoSlice";
 */
import styles from './video.module.css'
import { 
  playOn, 
  playOff,
  muteOn,
  muteOff,
  selectVideoFile, 
  selectPlayed,
  selectMute,
  selectVolume,
  writeCurrentTime,
  selectSpecifiedTime,
  setSpecifiedTime
 } from "../videoList/videoListSlice";

export function Video (props) {

  const ref = useRef()
  const dispatch = useDispatch()
  const location = props.location
  const urlId = useParams().id
  const id = props.id ? props.id : urlId
  
  // извлечение данных из стейта Redux
  const video = useSelector( (state)=> selectVideoFile(state, id) )
  const played = useSelector( (state)=> selectPlayed(state, id) )
  const mute = useSelector( (state)=> selectMute(state, id) )
  const volume = useSelector( (state)=> selectVolume(state, id)  )
  const specifiedTime = useSelector( (state)=> selectSpecifiedTime(state, id)  )

  
  //обработчики событий
  const playWhenHover = () => {
    if (location==='inListInVideoPage' || location==='inListInMain'){
      dispatch( playOn(id) );
      dispatch( muteOn(id) )
    }
  }
  const pauseWhenHoverOff = () => {
    if (location==='inListInVideoPage' || location==='inListInMain'){
      dispatch( playOff(id) );
      dispatch( muteOn(id) )
    }
  }
  const pauseWhenEnd = () => dispatch( playOff(id) )

  const onTimeUpdate =(e)=> {
    const currentTime = Math.floor(e.target.currentTime)
    dispatch( writeCurrentTime({id, currentTime}) )
    dispatch( setSpecifiedTime({id, specifiedTime:0}))
  }





  // если компонент строится внутри <VideoPage/>, то id берется из url
  // если внутри списка, то id берется из пропсов

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




  // после прогрузки в стейт перезаписываются, 
  // асинхронно сформированные в элементе video, значения 
/*   const onLoadedMetadata = () => {
    setState((state)=>(
      {...state, 
      muted: ref.current.muted,
      duration: Math.floor(ref.current.duration),
      }
    ))
  } */

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

    // БЛОК УПРАВЛЕНИЯ элементом video (play, paused, volume, muted )
    // т.е. поведение video управляется стейтом UI
    if (ref.current){
/*       ref.current.muted = state.muted
      ref.current.volume = state.volume
 */      

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
      if (specifiedTime !== 0){
        ref.current.currentTime = specifiedTime
      }

/*       if (played===true && location==='inVideoPage'){ 
        ref.current.pause()                                 // ОШиБКА т.к. это асинхронная функция
      } 
      if (played===false && location==='inVideoPage'){
        ref.current.play()                                   // ОШиБКА т.к. это асинхронная функция
      }
      if (played && (location==='inListInVideoPage' || 'inListInMain')){
        ref.current.muted = true
        ref.current.play()                                   // ОШиБКА т.к. это асинхронная функция
      }
      if (played===false && (location==='inListInVideoPage' || 'inListInMain')){
        ref.current.pause()                                   // ОШиБКА т.к. это асинхронная функция
        ref.current.currentTime = 0
      }
 */

    } 

/*     const setCurrentTime=(time)=>{
      ref.current.currentTime = time
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
            className = {style}
            ref = {ref}
/*             onLoadedMetadata = {onLoadedMetadata}
 *//*             
 */         
            onTimeUpdate = {onTimeUpdate }
            onMouseOver = { playWhenHover }
            onMouseOut = { pauseWhenHoverOff }
            onEnded = { pauseWhenEnd }
/*             onEnded = {onEnded}
            poster = {videoData.poster}
 */            >
            <source src={video}/>
            <track
/*               kind={state.isSubtitles===true?'subtitles':''}
              src={videoData.subtitles}
 */              srcLang="ru"
              default   
              label="Русский"    >
            </track>
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

