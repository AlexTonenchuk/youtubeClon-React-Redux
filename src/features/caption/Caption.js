import React from 'react'
import styles from './caption.module.css'
import { DateVideo } from '../dateVideo/DateVideo'
import { IconCanal } from '../iconCanal/IconCanal'



export function Caption (props) {

  let style
  if(props.location==='inMain'){
    style = styles.caption
  }
  if(props.location==='inListInVideoPage'){
    style = style+' '+styles.miniCaption
  }

  return (
    <div 
      className={style}>
        
      <div 
        className={styles.container}>
        { props.isInListInVideoPage ? false :
          <IconCanal 
            id = {props.id}
          />
        }
      </div> 
        
      <div 
        className={styles.rightContainer}>

        <div 
          className={styles.name}>
          {props.name}      
        </div>

        <div 
          className={styles.rowFlexContainer}>
          <div 
            className={styles.canalName}>  
            {props.canal}   
          </div>
        </div>

        <div 
          className={styles.rowFlexContainer}>
          <div className={styles.views}> 
            {`${props.views} просмотров *`} 
          </div>
          <DateVideo 
            creatDate={props.creatDate}
          />
        </div>

      </div>
  </div>
  )
}