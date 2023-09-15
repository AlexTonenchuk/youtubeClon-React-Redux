import React, {useRef, useState} from "react";
import { ControlPan } from '../controlPan/ControlPan'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectVideoById } from '../listVideos/listVideosSlice'
import styles from './video.module.css'


export function Video (props) {

  // если компонент строится внутри <VideoPage/>, то id берется из url
  // если внутри списка, то id берется из пропсов
  let id = useParams().id
  if(!id){
    id = props.id
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

    const playNextVideo =()=>{
      setState((state)=>({...state, id: ++state.id}))
    }
    const setVolume =(volume)=>{
      setState((state)=>({...state, volume: volume}))
    }
    const toggleAutoplay =()=> {
      setState((state)=>({...state, autoplay: !state.autoplay}))
    }
    const toggleMuted = () => {
      setState((state)=>({...state, muted: !state.muted}))
    }
    const toggleWideScreen = () => {
      setState((state)=>({...state, widthScreen: !state.widthScreen}))
    }
    const toggleSubtitles = () => {
      setState(state =>({...state, isSubtitles: !state.isSubtitles}))
    }
    const togglePlayPause=()=>{
      setState((state)=>({...state, paused: !state.paused}))
    }

  //управление стилями <Video/> --- сделать понормальному т.е. styleState !
  let style
  if (props.isInMain){
    style = styles.videoInListInMain
  } else if (props.isInListInVideoPage){
    style = styles.videoInListInVideoPage
  }
  if (state.widthScreen === true){       
    style = style+' '+styles.widthScreen
  }

  // UI
  return (
    <div >
      <div >
        <video
          key={state.id}
          className={style}
          ref={ref}
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate ={changeCurrentTime }
          onEnded={onEnded}
          poster={props.poster}
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
                                        {/* КОМПОНЕНТ */}
        {
          props.isInMain || props.isInListInVideoPage ? false : 
          <ControlPan
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
        }

      </div>
{/*         <div className ={styles.rightPanel}>
        <ListVideos isInVideoMain={false}/>
      </div>
*/}      </div>
  )
} 

