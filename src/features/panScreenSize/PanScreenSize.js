import React from "react";
import styles from './panScreenSize.module.css'
import { useSelector } from "react-redux";
import { selectScreenSize } from "./panScreenSizeSlice";
import { BtnFullScreen } from '../btnFullScreen/BtnFullScreen'
import { BtnBigScreen } from '../btnBigScreen/BtnBigScreen'
import { BtnMiniPlayer } from "../btnMiniPlayer/BtnMiniPlayer";

export function PanScreenSize (props) {
  const id = props.id
  const screenSize = useSelector( selectScreenSize )
  // RETURN:
  return (
    <div className={styles.panScreenSize}>
      { screenSize === 'smallScreen' || screenSize === 'bigScreen' ? <BtnMiniPlayer/> : false }
      { screenSize === 'smallScreen' || screenSize === 'bigScreen' ? <BtnBigScreen id={id}/> : false }
      { screenSize === 'smallScreen' || screenSize === 'bigScreen' ? <BtnFullScreen id={id} /> : false }
      { screenSize === 'fullScreen' ? <BtnFullScreen id={id} /> : false }
    </div>
  )
}