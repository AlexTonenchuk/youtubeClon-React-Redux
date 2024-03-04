import React, {useRef, useEffect}   from "react"
import { ControlPan }               from '../controlPan/ControlPan'
import { Caption }                  from '../caption/Caption'
import { useParams, useNavigate }   from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styles                       from './video.module.css'
import { 
  playOn, 
  playOff,
  muteOn,
  muteOff,
  writeCurrentTime,
  setSpecifiedTime,
  writeDuration,
  selectIsSubtitles,
  selectSubtitles,
  selectVideoFile, 
  selectPlayed,
  selectPoster,
  selectMute,
  selectVolume,
  selectSpecifiedTime,
 } from "../videoList/videoListSlice"
import {  selectAutoplay }  from '../btnAutoplay/btnAutoplaySlice.js'
import { selectScreenSize } from "../panScreenSize/panScreenSizeSlice";
import { selectSpeed }      from "../speedMenu/speedMenuSlice";
import { selectSearch }     from "../search/searchSlice.js"

export function Video (props) {
  const ref = useRef()
  const dispatch = useDispatch()
  const location = props.location
  const urlId = useParams().id
  /* из пропсов id берется для видеороликов
  внутри списка, а из url для главного видео */
  const id = props.id ? props.id : urlId
  const navigate = useNavigate()
  // БЛОК ИЗВЛЕЧЕНИЯ ЗНАЧЕНИЙ из ReduxState
  const video =         useSelector( (state)=> selectVideoFile(state, id) )
  const played =        useSelector( (state)=> selectPlayed(state, id) )
  const mute =          useSelector( (state)=> selectMute(state, id) )
  const volume =        useSelector( (state)=> selectVolume(state, id)  )
  const specifiedTime = useSelector( (state)=> selectSpecifiedTime(state, id)  )
  const isSubtitles =   useSelector( (state)=> selectIsSubtitles(state, id)  )
  const subtitles =     useSelector( (state)=> selectSubtitles(state, id)  )
  const poster =        useSelector( (state)=> selectPoster(state, id)  )
  const autoplay =      useSelector( selectAutoplay )
  const screenSize =    useSelector( selectScreenSize )
  const speed =         useSelector( selectSpeed )
  const search =        useSelector( selectSearch )
  // БЛОК УПРАВЛЕНИЯ DOM-узлом:
  useEffect( ()=>{
    /* если промис ref.current.play() еще на завершился то ref.current.pause() вызовет ошибку
    но по факту это не ошибка, это просто сообщение что загрузка оборвана
    это и нужно, т.е. вкл/выкл проигрывания будет абсолютно контролируемым процессом
    со стороны пользователя */
    console.dir(mute)
    ref.current.volume = volume

    if (played === true)              { ref.current.play() } 
    if (played === false)             { ref.current.pause() }
    if (mute === true)                { ref.current.volume = 0 } 
    if (mute !== true)                { ref.current.volume = volume }
    if (specifiedTime !== undefined)  { ref.current.currentTime = specifiedTime }
    ref.current.playbackRate = speed
  })
  // БЛОК ОБРАБОТЧКОВ: 
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
    dispatch( setSpecifiedTime({id, specifiedTime: undefined}))
  }
  const onClick =()=> {
    if (location==='inListInVideoPage' || location==='inListInMain') {
      dispatch ( setSpecifiedTime({id, specifiedTime:0}) )
      dispatch ( writeCurrentTime({id, currentTime:0}) )
      dispatch (playOff(id))
      dispatch ( muteOn(id))
    }
  }
  /* после прогрузки, в стейт перезаписываются значения, 
  асинхронно сформированные в элементе video*/  
  const onLoadedMetadata = () => {
    const duration = Math.floor(ref.current.duration)
    dispatch( writeDuration({id, duration}))
  } 
  // БЛОК ИЗВЛЕЧЕНИЯ CТИЛЕЙ:
  const {
    blackBackground,
    containerInListInMain,
    containerInListInMainFiltred,
    videoInListInMain,        
    videoInListInMainFiltred,
    videoInListInVideoPage,     
    videoInVideoPageSmallScreen,
    videoInVideoPageBigScreen,
    videoInVideoPageFullScreen,
    containerForSmallScreen,
    containerForBigScreen,
    containerForFullScreen,
    containerInListInVideopage,
  } = styles
  // БЛОК УПРАВЛЕНИЯ СТИЛЯМИ <Video/> (похорошему бы переделать в switch):
  const calcVideoStyle =()=> {
    if (location==='inListInMain')        { return videoInListInMain } 
    if (location==='inListInMain' 
        && search)                        { return videoInListInMainFiltred  }
    if (location==='inListInVideoPage')   { return videoInListInVideoPage  }
    if (location==='inVideoPage'
        && screenSize==='smallScreen')    { return videoInVideoPageSmallScreen }
    if (location==='inVideoPage'
        && screenSize==='bigScreen')      { return videoInVideoPageBigScreen } 
    if (location==='inVideoPage' 
        && screenSize==='fullScreen')     { return videoInVideoPageFullScreen } 
  }
  // БЛОК УПРАВЛЕНИЯ СТИЛЯМИ container вокруг <Video/> и <Caption/> (похорошему бы переделать в switch)
  const calcContainerStyle =()=> {
    if (location==='inListInMain'
        && !search)                      { return containerInListInMain } 
    if (location==='inListInMain'
        && search )                      { return containerInListInMainFiltred }
    if (location==='inListInVideoPage')  { return containerInListInVideopage  }
    if (location==='inVideoPage' 
        && screenSize==='smallScreen')   { return containerForSmallScreen  }
    if (location==='inVideoPage' 
        && screenSize==='bigScreen')     { return containerForBigScreen  }
    if (location==='inVideoPage' 
        && screenSize==='fullScreen')    { return containerForFullScreen  }
  }
  // RETURN
  return (
    <div className={calcContainerStyle()}>
      <div className={screenSize==='bigScreen' ? blackBackground : ''}>
        <video
          id = {id}
          key = {id}
          className = { calcVideoStyle() }
          ref = {ref}
          onLoadedMetadata = { onLoadedMetadata }
          onTimeUpdate = { onTimeUpdate }
          onMouseOver = { onMouseOver }
          onMouseOut = { onMouseOut }
          onClick = { onClick }
          onEnded = { onEnded }
          poster = { poster }  >
          <source src={video}/>
          { isSubtitles === true ? 
            <track kind = 'subtitles' src = { subtitles } srcLang="ru" default label="Русский"/>
            : false
          }
        </video>
      </div>
      { location==='inVideoPage' ? <ControlPan id = {id} location={location} videoRef={ref} />  : false }        
      { location==='inListInMain' || location==='inFiltredListInMain' || location==='inListInVideoPage' ? 
        <Caption id={id} location={location}/> 
        : false 
      }
    </div>
  )
} 

