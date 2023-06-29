import React from 'react'
import styles from './testCanal.module.css'
import { useParams } from 'react-router-dom'


export function TestCanal () {
   let x = useParams()
   console.dir(x)
    return (
        <div className = {styles.testCanal}>
            This is testCanal page --- id : {x.id}
        </div>
    )
}