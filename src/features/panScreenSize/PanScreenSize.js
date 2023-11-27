import React from "react";
import styles from './panScreenSize.module.css'
import { useSelector } from "react-redux";
import { selectScreenSize } from "./panScreenSizeSlice";
import { BtnFullScreen } from '../btnFullScreen/BtnFullScreen'
import { BtnBigScreen } from '../btnBigScreen/BtnBigScreen'
import { BtnMiniPlayer } from "../btnMiniPlayer/BtnMiniPlayer";

export function PanScreenSize () {
  const screenSize = useSelector( selectScreenSize )
  // RETURN:
  return (
    <div className={styles.panScreenSize}>
      { screenSize === 'smallScreen' || screenSize === 'bigScreen' ? <BtnMiniPlayer/>   : false }
      { screenSize === 'smallScreen' || screenSize === 'bigScreen' ? <BtnBigScreen/>   : false }
      { screenSize === 'smallScreen' || screenSize === 'bigScreen' ? <BtnFullScreen/> : false }
      { screenSize === 'fullScreen' ? <BtnFullScreen/> : false }
    </div>
  )
}