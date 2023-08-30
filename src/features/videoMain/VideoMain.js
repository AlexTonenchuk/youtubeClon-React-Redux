import React, {useRef, useState} from "react";
import { ControlPan } from '../controlPan/ControlPan'
import { useParams, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectVideoById } from '../listVideos/listVideosSlice'
import styles from './videoMain.module.css'
import { TimeTrack } from "../timeTrack/TimeTrack";
import { ListVideos } from "../listVideos/ListVideos"


export function VideoMain () {
    const id = useParams().id
    const videoData = useSelector((state) => selectVideoById(state, id))
    const ref = useRef()

    // инициализация стейта, 
    // чтобы пропсами передать потомкам значения без андефайнед
    const [state, setState] = useState ({
        isPlay: false,
        muted: false,
        volume: 0.5,          // 0...1
        isSubtitles: true,
        speed: 1,
        quality: 480,       // 360, 480, 720
        size: 'normal',     // normal, mini, wide, full
        currentTime: 0,
        duration: 0,
        paused: true,
        wideScreen: false,
    })

    // в стейт перезаписываются асинхронно сформированные в эл. video значения 
    const onLoadedMetadata = () => {
        setState((state)=>(
            {...state, 
            muted: ref.current.muted,
            duration: Math.floor(ref.current.duration),
            }
        ))
    }

    // в стейте постоянно обновляется текущее время ролика
    // оно нужно для <CurrentTime/>
    const changeCurrentTime=()=>{
        setState(state =>(
            {...state, 
            currentTime: Math.floor(ref.current.currentTime)
            }
        ))
    }

    // управление play/paused элемента video
    if (ref.current){
        ref.current.muted = state.muted
        ref.current.volume = state.volume
        if (state.paused===true){ 
            ref.current.pause()
        } else if (state.paused===false){
            ref.current.play()
        }
    } 

    // обработчики событий, инициируемых пользователем
    // т.е. функции изменения стейта, для передачи их в пропсы
    const setCurrentTime=(time)=>{
        ref.current.currentTime = time
    }
    const setVolume =(volume)=>{
        setState((state)=>({...state, volume: volume}))
    }
    const toggleMuted = () => {
        setState((state)=>({...state, muted: !state.muted}))
    }
    const toggleWideScreen = () => {
        setState((state)=>({...state, wideScreen: !state.wideScreen}))
    }
    const toggleSubtitles = () => {
        setState(state =>({...state, isSubtitles: !state.isSubtitles}))
    }
    const togglePlayPause=()=>{
        setState((state)=>({...state, paused: !state.paused}))
    }    

    //управление стилями <VideoMain/>
    let videoMainClass
    if (state.wideScreen === true) { 
        videoMainClass=styles.wideScreen
    } else if (state.wideScreen === false){
        videoMainClass=styles.smallScreen
    }

    // UI
    return (
        <div className={styles.flex}>
            <div className={videoMainClass}>
                <video
                    ref={ref}
                    onLoadedMetadata={onLoadedMetadata}
                    onTimeUpdate ={changeCurrentTime }
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
                <ControlPan 
                    currentTime={state.currentTime}
                    duration={state.duration}
                    isSubtitles={state.isSubtitles}
                    muted={state.muted}
                    setVolume={setVolume}
                    setCurrentTime={setCurrentTime}
                    toggleMuted={toggleMuted}
                    togglePlayPause={togglePlayPause}
                    toggleWideScreen={toggleWideScreen}
                    toggleSubtitles={toggleSubtitles}
                    paused={state.paused}
                    volume={state.volume}
                    wideScreen={state.wideScreen}
                />
            </div>
            <div className ={styles.rightPanel}>
                <ListVideos isInVideoMain={true}/>
            </div>
        </div>
    )
} 

