import React from 'react'
import styles from './caption.module.css'
import { useSelector } from 'react-redux'
import { DateVideo } from '../dateVideo/DateVideo'
import { selectName, selectCanal, selectViews } from '../videoList/videoListSlice'

export function Caption (props) {
  const id = props.id
  const name = useSelector((state)=> selectName(state, id))
  const canal = useSelector((state)=> selectCanal(state, id))
  const views = useSelector((state)=> selectViews(state, id))
  const location = props.location
  const {
    canalName,
    dot,
    rightContainer,
    rowFlexContainer,
    round,
    miniCaption,
    nameStyle,
    viewsStyle,
  } = styles
  const calcStyle =()=> {
    if(location==='inListInVideoPage' || location==='inFiltredListInMain'){ return (miniCaption) }
  }
  return (
    <div className={calcStyle()} >
      { location==='inListInVideoPage' ? false : <div className={round} >  </div> }
      <div className={rightContainer} >
        <div className={nameStyle} > { name }   </div>
        <div className={canalName} > { canal } </div>
        <div className={rowFlexContainer} >
          <div className={viewsStyle}> { `${views} просмотров` } </div>
          <div className={dot}> </div>
          <DateVideo id={id}/>
        </div>
      </div>
    </div>
  )
}