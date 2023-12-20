import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Video } from '../video/Video'
import { videoList } from '../../data/data';
import styles from './videoList.module.css'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { selectScreenSize } from "../panScreenSize/panScreenSizeSlice";
import { selectSearch, setSearch } from '../search/searchSlice';
import { useEffect } from 'react';
import { selectCategories } from './videoListSlice';
import { selectCurrentFilter } from '../filters/filtersSlice';
import { setFilter } from '../filters/filtersSlice';


export function VideoList (props) {
  const location = props.location
  const urlId = useParams().id
  const dispatch = useDispatch()
  const screenSize =  useSelector( selectScreenSize)
  const search = useSelector(selectSearch)
  const filter = useSelector(selectCurrentFilter)

  // обнуление поля поиска в глобальном стейте
  // после выполнения поиска
  useEffect( ()=> {
    if (location === 'inVideoPage') { 
      dispatch( setFilter('Все'))
    }
  })

  const {
    inMain,
    inMainFiltred,
    inRightSide,
    underBigScreenVideo,
    underFullScreenVideo
  } = styles

  // !!! похорошему бы переделать в switch !!!
  const calcStyle =()=> {
    if (location==='inMain' && !search)                         { return inMain } 
    if (location==='inMain' && search)                          { return inMainFiltred } 
    if (location==="inVideoPage" && screenSize==='smallScreen') { return inRightSide }
    if (location==="inVideoPage" && screenSize==='bigScreen')   { return underBigScreenVideo }
    if (location==="inVideoPage" &&  screenSize==='fullScreen') { return underFullScreenVideo }
  }

  // фу. фильтрации списка видео с учетом поискового запроса
  // и с учетом выбронного фильтра-жанра музыки
  const filterVideoList = ( videoList, searchWord, filter )=> {
    if (location==="inVideoPage") {return videoList }
    let filtredVideoList = []
    videoList.forEach((item) => {
      const name = item.name
      const pattern = new RegExp( `\\b${searchWord}`, 'i')
      const isContainCategory = item.categories.find((i) => i === filter) === filter ? true : false
      if ( isContainCategory===true && (!searchWord || pattern.test(name)) ) { 
        filtredVideoList.push(item)  
      }
    })
    return filtredVideoList
  }

  const videos = filterVideoList(videoList, search, filter).map((item) => {
    const id = `${item.id}`
    if ( id !== urlId ){
      return (
        <Link id = {id} key = {id} to = {`/video/`+ id}>
          <Video 
            id = {id} 
            key={id}  
            preload="auto"
            location = {  location==='inMain' ? 'inListInMain' : false
                            ||
                          location==='inVideoPage' ? 'inListInVideoPage' : false  }
          />
        </Link>
      )     
    } else { return false }
  });

  return (
    <div className={calcStyle()}>
      {videos}
    </div>
  )
}
