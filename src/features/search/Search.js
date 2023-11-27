import React from "react";
import styles from './search.module.css'
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setSearch, selectSearch } from "./searchSlice";
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom"


export function Search(){
  const dispatch = useDispatch()
  const [formIsFocused, setFormIsFocused] = useState(false)
  const [formHaveLetter, setFormHaveLetter] = useState()
  const [hoveredId, setHoveredId] = useState(undefined)
  const location = useLocation()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearch(formHaveLetter));
    // если url = /video/.. то при сабмите поискового запроса меняется путь
    if (Array.from(location.pathname)[1]==='v') {  navigate('/')  }
  }

  const onKeyDown=(e)=> {
    if (e.keyCode===13) {
      e.preventDefault()
      dispatch(setSearch(formHaveLetter))
      // если url = /video/.. то при сабмите поискового запроса меняется путь
      if (Array.from(location.pathname)[1]==='v') {  navigate('/')  }
    }
  }

  // управление стилями
  const {
    closeBtn,
    hide,
    loupeStyle,
    inputStyle,
    keyboardBtnStyle,
    searchBtnStyle,
    showPrompt,
    microphoneBtnStyle,
    formStyle,
    formWithFocusStyle,
    search,
  } = styles


  return (

    <div  id='search' className ={search} >

      <form
        className={ formIsFocused===false ? formStyle : formWithFocusStyle }
        name = 'search'
        onSubmit={ onSubmit }
        onFocus={ ()=>setFormIsFocused(true) }
        onBlur={ ()=>setFormIsFocused(false) }
        >

        <div id='loupe' className={ formIsFocused===true ? loupeStyle : hide}></div>
 
        <input
          name='input'
          className={inputStyle}
          type = "text"
          placeholder = 'Введите запрос'
          onChange={ (e)=> setFormHaveLetter(e.target.value) }
          onKeyDown={ onKeyDown }
          value = {formHaveLetter}
        />

        <div 
          id='keyboard' 
          className = {keyboardBtnStyle}
          onMouseOver={ (e)=> setHoveredId(e.target.id) }
          onMouseLeave={ ()=> setHoveredId(undefined) }
        >
        <div className={ hoveredId==='keyboard' ? showPrompt : hide}> 
          Клавиатура временно не раб. 
        </div>

        </div>

        <button 
          id='close' 
          className = { formHaveLetter ? closeBtn : hide }
          type="submit"
          onClick={ (e)=> {
            e.preventDefault(); 
            setFormHaveLetter('')
          }}
          > 
          
        </button>

        <button 
          id='searchBtn' 
          className={ searchBtnStyle }
          onMouseOver={ (e)=> setHoveredId(e.target.id) }
          onMouseLeave={ ()=> setHoveredId(undefined) }
        >   
          <div className={ hoveredId==='searchBtn' ? showPrompt : hide}> Введите запрос </div>
        </button>

        <button
          id='microphoneBtn'
          className={ microphoneBtnStyle }
          onMouseOver={ (e)=> setHoveredId(e.target.id) }
          onMouseLeave={ ()=> setHoveredId(undefined) }
        >   
          <div className={ hoveredId==='microphoneBtn' ? showPrompt : hide}> 
            Голосовой поиск временно не раб.
          </div>
        </button>
  
      </form>

    </div>
  )

}
