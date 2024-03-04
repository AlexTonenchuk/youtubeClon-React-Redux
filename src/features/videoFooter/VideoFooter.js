import React from 'react'
import styles from './videoFooter.module.css'
import { useSelector } from 'react-redux'
import { selectName, selectCanal } from '../videoList/videoListSlice'
import subscribeImg  from './subscribe.png'
import buttonsImg from './buttons.png'
import commentsImg from './comments.png'
import { selectScreenSize } from "../panScreenSize/panScreenSizeSlice";


export function VideoFooter (props) {
  const id = props.componentId
  const name = useSelector((state)=> selectName(state, id))
  const canal = useSelector((state)=> selectCanal(state, id))
  const screenSize = useSelector( selectScreenSize )
  const {
    buttons,
    canalStyle,
    comments,
    containerForBigScreen,
    containerForSmallScreen,
    description,
    flex,
    nameStyle,
    round,
    inlinelock,
    subscribe,
  } = styles
  const calcStyle = ()=> {
    if(screenSize==='smallScreen') {return  containerForSmallScreen }
    if(screenSize==='bigScreen' || screenSize==='fullScreen' ) {return containerForBigScreen}
  }
  return (
    <div className={calcStyle()}>
      <div className={nameStyle}> {name} </div>
      <div className={flex}>
        <div>
          <div className={round}> </div>
          <div className={inlinelock}>
            <div className={canalStyle}> {canal} </div>
            <div> 100 подписчиков</div>
          </div>
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