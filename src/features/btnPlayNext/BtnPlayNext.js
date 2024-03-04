import React from "react";
import styles from './btnPlayNext.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { togglePlay, selectPlayed } from "../videoList/videoListSlice";


export function BtnPlayNext(props){
  const id = props.id
  const dispatch =  useDispatch()
  const navigate =  useNavigate()
  const played =    useSelector( (state)=> selectPlayed(state, id) )
  const onclick =()=> {
    if (played) { 
      dispatch( togglePlay(id) ) 
    }
    navigate( '/video/'+(Number(id)+1) )
  }
  return (
    <button id='btnPlayNext' className={styles.btnPlayNext} onClick={ onclick } >
    </button>
  )
}