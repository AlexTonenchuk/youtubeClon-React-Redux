import React from 'react'
import styles from './videoFooter.module.css'
import { useSelector } from 'react-redux'
import { selectName, selectCanal, selectViews } from '../videoList/videoListSlice'
import { selectScreenSize } from '../panScreenSize/panScreenSizeSlice'
import { DateVideo } from '../dateVideo/DateVideo'
import subscribeImg  from './subscribe.png'
import buttonsImg from './buttons.png'
import commentsImg from './comments.png'


export function VideoFooter (props) {
  const id = props.id
  const name = useSelector((state)=> selectName(state, id))
  const canal = useSelector((state)=> selectCanal(state, id))
  const screenSize = useSelector(selectScreenSize)

  const {
    buttons,
    canalStyle,
    comments,
    description,
    forSmallScreen,
    forBigScreen,
    nameStyle,
    round,
    flex,
    subscribe,
      } = styles

  const calcContainerStyle=()=>{
    if (screenSize==='smallScreen') {return forSmallScreen}
    if (screenSize==='bigScreen' || screenSize==='fullScreen') {return forBigScreen}
  }

  return (
    <div className={calcContainerStyle()}>

      <div className={nameStyle}> {name} </div>

      <div className={flex}>

        <div className={round}> </div>

        <div>
          <div className={canalStyle}> {canal} </div>
          <div> 100 подписчиков</div>
        </div>

        <img src={subscribeImg} className={subscribe} />  
        <img src={buttonsImg} className={buttons} />  

      </div>

      <div className={description}>
        Здесь будет описание видеоролика. Но пока что здесь стоит просто текст заглушка.
        Для того чтобы этот блок выглядел наглядно. Хотя этот блок не особо интересен с точки зрения 
        React. Более интересны функциональности, связанные с управлением видео.
      </div>

      <img src={commentsImg} className={comments} />
       
    </div>
  )
}