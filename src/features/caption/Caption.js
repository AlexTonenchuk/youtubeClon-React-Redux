import React from 'react'
import styles from './caption.module.css'
import { useSelector } from 'react-redux'
import { DateVideo } from '../dateVideo/DateVideo'
import { IconCanal } from '../xxx iconCanal/IconCanal'
import { selectName, selectCanal, selectViews } from '../videoList/videoListSlice'

export function Caption (props) {

  const id = props.id
  const name = useSelector((state)=> selectName(state, id))
  const canal = useSelector((state)=> selectCanal(state, id))
  const views = useSelector((state)=> selectViews(state, id))


  const calcStyle =()=> {
    if(props.location==='inMain'){  return styles.caption }
    if(props.location==='inListInVideoPage'){ return (styles.caption+' '+styles.miniCaption) }
    if(props.location==='inFiltredListInMain'){ return (styles.caption+' '+styles.miniCaption) }

  }

  return (
    <div className={calcStyle()} >
        
      { props.location==='inListInVideoPage' ? false : <div className={styles.round} >  </div> }
      
      <div className={styles.rightContainer} >

        <div className={styles.name} > { name }   </div>

        <div className={styles.canalName} > { canal } </div>

        <div className={styles.rowFlexContainer} >
          <div className={styles.views}> { `${views} просмотров` } </div>
          <div className={styles.dot}> </div>
          <DateVideo id={id}/>
        </div>

      </div>
    </div>
  )
}