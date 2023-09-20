import React, {useRef, useState} from "react";
import { ControlPan } from '../controlPan/ControlPan'
import { Caption} from '../caption/Caption'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectVideoById } from '../listVideos/listVideosSlice'
import styles from './video.module.css'
import { ListVideos } from "../listVideos/ListVideos";


export function Video (props) {

  // если компонент строится внутри <VideoPage/>, то id берется из url
  // если внутри списка, то id берется из пропсов
  let id 
  id= useParams().id
  if (props.id){
    id=props.id
  }

  // инициализация локального стейта UI (React), 
  // чтобы пропсами передать потомкам значения без андефайнед
  const [state, setState] = useState ({
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
  })


  // извлечение данных из стейта данных (Redux)
  const videoData = useSelector((reduxState) => selectVideoById(reduxState, state.id))
  const ref = useRef()

  // после прогрузки в стейт перезаписываются, 
  // асинхронно сформированные в элементе video, значения 
  const onLoadedMetadata = () => {
    setState((state)=>(
      {...state, 
      muted: ref.current.muted,
      duration: Math.floor(ref.current.duration),
      }
    ))
  }

  // по окончанию видео инкриментируем id для построения следущего <Video/>
  const onEnded =()=>{
    setState((state)=>({...state, id: ++state.id}))
    setState((state)=>({...state, paused: true}))

  }

  // обработчик событий, который в стейте постоянно обновляет 
  // текущее время ролика, которое нужно для <CurrentTime/>
    const changeCurrentTime =()=> {
      setState((state) =>(
        {...state, 
        currentTime: Math.floor(ref.current.currentTime)
        }
      ))

    }
    // блок управления элементом video (play, paused, volume, muted )
    // т.е. поведение video управляется стейтом UI
    if (ref.current){
      ref.current.muted = state.muted
      ref.current.volume = state.volume
      if (state.paused===true){ 
          ref.current.pause()             // ОШиБКА т.к. это асинхронная функция
      } else if (state.paused===false){
          ref.current.play()              // ОШиБКА т.к. это асинхронная функция
      }
    } 
    const setCurrentTime=(time)=>{
      ref.current.currentTime = time
    }
    // обработчики событий, инициируемых пользователем
    // т.е. функции изменения стейта, для передачи их в пропсы

    const playNextVideo =()=> {
      setState((state)=>({...state, id: ++state.id}))
    }
    const setVolume =(volume)=> {
      setState((state)=>({...state, volume: volume}))
    }
    const toggleAutoplay =()=> {
      setState((state)=>({...state, autoplay: !state.autoplay}))
    }
    const toggleMuted =()=> {
      setState((state)=>({...state, muted: !state.muted}))
    }
    const toggleWideScreen =()=> {
      setState((state)=>({...state, widthScreen: !state.widthScreen}))
    }
    const toggleSubtitles =()=> {
      setState(state =>({...state, isSubtitles: !state.isSubtitles}))
    }
    const togglePlayPause =()=> {
      setState((state)=>({...state, paused: !state.paused}))
    }

    const locationVideo = props.location

  //управление стилями <Video/> --- сделать понормальному т.е. styleState !
  let style
  if (locationVideo==='inListInMain'){
    style = styles.videoInListInMain
  } 
  if (locationVideo==='inListInVideoPage'){
    style = styles.videoInListInVideoPage
  }
  if (locationVideo==='inVideoPage'){
    style = styles.inVideoPage
  }
 /*  if (state.widthScreen === true){       
    style = style+' '+styles.widthScreen
  } */

console.dir(locationVideo)

  // UI
  return (
    <div >
      <div className ={ locationVideo==='inVideoPage' ? styles.flex : false } >
        <div className ={ locationVideo==='inListInVideoPage' ? styles.flex : false } >
          
          <video
            className = {style}
            ref = {ref}
            onLoadedMetadata = {onLoadedMetadata}
            onTimeUpdate = {changeCurrentTime }
            onEnded = {onEnded}
            poster = {videoData.poster}
            >
            <source src={videoData.video}/>
            <track
              kind={state.isSubtitles===true?'subtitles':''}
              src={videoData.subtitles}
              srcLang="ru"
              default   
              label="Русский"       >
            </track>
          </video>
        
          { locationVideo==='inVideoPage' ? 
            <ControlPan                           // ОШИБКА!!! передать просто state
              autoplay={state.autoplay}
              currentTime={state.currentTime}
              duration={state.duration}
              isSubtitles={state.isSubtitles}
              muted={state.muted}
              playNextVideo={playNextVideo}
              setVolume={setVolume}
              setCurrentTime={setCurrentTime}
              toggleAutoplay={toggleAutoplay}
              toggleMuted={toggleMuted}
              togglePlayPause={togglePlayPause}
              toggleWideScreen={toggleWideScreen}
              toggleSubtitles={toggleSubtitles}
              paused={state.paused}
              volume={state.volume}
              wideScreen={state.wideScreen}
            />
            : false
          }

          { locationVideo==='inListInMain' ||
            locationVideo==='inListInVideoPage' ?
            <Caption
              location={props.location}
              name={videoData.name}
              canal={videoData.canal}
              views={videoData.views}
              videodata={videoData.creatDate}
            />
            : false
          }

        </div>

        { locationVideo==='inVideoPage' ?
          <div  className={styles.listVideosContainer}>
            <ListVideos
              location='inVideoPage'
            />
          </div>
          : false
        }

      </div>
      </div>
  )
} 

