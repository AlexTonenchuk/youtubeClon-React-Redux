import React from "react";
import styles from './btnSubtitles.module.css'
import { useSelector, useDispatch } from "react-redux";
import { toggleSubtitles, selectIsSubtitles } from "../videoList/videoListSlice";

export function BtnSubtitles(props) {
  const id = props.id
  const dispatch = useDispatch()
  const subtitles = useSelector( (state)=> selectIsSubtitles(state, id)  )
  const {
    btn,
    subtitlesOn,
    subtitlesOff,
  } = styles
  return (
    <button
      id='subtitles'
      className={ btn + ' ' + (subtitles===true ? subtitlesOn : subtitlesOff) }
      onClick={ ()=> dispatch(toggleSubtitles(id)) }       
    >
    </button>
  )
}

