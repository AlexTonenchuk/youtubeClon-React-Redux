import React from 'react'
import styles from './iconCanal.module.css'

export function IconCanal (props) {
    const openCanal =()=>{
        console.dir(props.id)
    }
    return (
    <div 
        className={styles.iconCanal}
        onClick = {openCanal}>
    </div>
    )
} 