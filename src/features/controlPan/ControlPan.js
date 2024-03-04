import styles from './controlPan.module.css'
import { Time } from "../time/Time"
import { Volume } from '../volume/Volume'
import { TimeTrack } from "../timeTrack/TimeTrack";
import { BtnSettings } from "../btnSettings/BtnSettings"; 
import { BtnAutoplay } from "../btnAutoplay/BtnAutoplay";
import { BtnPlayNext } from "../btnPlayNext/BtnPlayNext";
import { BtnSubtitles } from "../btnSubtitles/BtnSubtitles";
import { PanScreenSize } from "../panScreenSize/PanScreenSize";
import { useSelector, useDispatch } from "react-redux";
import { muteOff, togglePlay, selectPlayed } from "../videoList/videoListSlice";

export function ControlPan (props) {
  const id = props.id
  const dispatch = useDispatch()
  const played = useSelector( (state)=> selectPlayed(state, id) )
  const togglePlayPause =()=> {
    dispatch( togglePlay(id) )
    dispatch( muteOff(id) )
  }
  const {
    controlPan,
    flex,
    leftContainer,
    pause,
    play,
    rightContainer,
  } = styles
  return (
    <div className={controlPan}>
      <TimeTrack id={id} />
      <div className={flex}>
        <div className={leftContainer}>
          <button id='playPauseBtn' className={ played===true ? pause : play}  onClick={togglePlayPause} >
          </button>
          <BtnPlayNext id={id}/>
          <Volume id={id} />
          <Time id={id} />
        </div>
        <div className={rightContainer}>
          <BtnAutoplay/>
          <BtnSubtitles id={id}/>
          <BtnSettings/>
          <PanScreenSize id={id} />
        </div>
      </div>
    </div>
  )
}