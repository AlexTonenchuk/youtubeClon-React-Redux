import React from 'react';
import { HeaderApp } from '../headerApp/HeaderApp';
import { VideoList } from '../videoList/VideoList';
import { VideoFooter } from '../videoFooter/VideoFooter';
import styles from './videoPage.module.css';
import { Video } from '../video/Video';
import { selectScreenSize } from "../panScreenSize/panScreenSizeSlice";
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'



export function VideoPage() {
  const screenSize =    useSelector( selectScreenSize )
  const id = useParams().id

  const {
    containerWhenSmallScreen,
    containerWhenBigScreen,
    container,
  } = styles
  return (
    <div className = {container} >
      { 
        screenSize==='smallScreen' ? 
        <div className = {container}>
          <HeaderApp/>
          <div className = {containerWhenSmallScreen}>
            <Video location = 'inVideoPage' />
            <VideoFooter componentId = {id}/>
          </div>
          <VideoList location = 'inVideoPage' />
        </div>
        : false
      }
      { 
        screenSize==='bigScreen' || screenSize==='fullScreen' ?
        <div className = {container}>
          <HeaderApp/>
          <Video location = 'inVideoPage' />
          <div className = {containerWhenBigScreen}>
            <VideoFooter componentId = {id} />
            <VideoList location = 'inVideoPage' />
          </div>
        </div>
        : false
      }

    </div>
  );
}

