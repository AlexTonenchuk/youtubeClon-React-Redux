import React from 'react';
import styles from './Filters.module.css';
import { useState, useRef, useMemo, } from 'react';
import { useSelector} from 'react-redux';
import {selectFilters, setFilter, selectCurrentFilter} from './filtersSlice'
import { useDispatch } from 'react-redux';

export function Filters () {
  const dispatch = useDispatch()
  const currentFilter = useSelector(selectCurrentFilter)
  // useRef чтобы получать координаты положения панели с кнопками
  const wrap = useRef()
  const conteiner = useRef()
  //Если экран узкий, то двигаем панель с кнопками изменением у wrap левого margin
  const [marginLeftWrap, setLeft] = useState(0)
  const moveRight = () => {
    const right = (wrap.current.offsetLeft + wrap.current.offsetWidth - 
      conteiner.current.offsetLeft - conteiner.current.offsetWidth
    )
    if (right > 260) {
      setLeft((marginLeftWrap) => marginLeftWrap - 260)
    } else if ((right < 260 || right === 260) && right > 0 ) {
      setLeft((marginLeftWrap) => marginLeftWrap - right - 5)
    }
  }
  const moveLeft = () => {
    const left =  conteiner.current.offsetLeft - wrap.current.offsetLeft
    if (left > 260) {
      setLeft((marginLeftWrap) => marginLeftWrap + 260)  
    } else if (left < 260 || left === 260) {
      setLeft((marginLeftWrap) => marginLeftWrap + left + 5)  
    }
  }
  // Показываем/прячем всплыв. подсказки изменение классов
  const [classes, setClasses]=useState({
    leftBtnPromptClass: styles.hide,
    rightBtnPromptClass: styles.hide,
  })
  const showPrompt = (e) => {
    const btn = e.target.id
    setClasses({...classes, [`${btn}PromptClass`]: styles.prompt })
  }
  const hidePrompt = (e) => {
    const btn = e.target.id
    setClasses({...classes, [`${btn}PromptClass`]: styles.hide })
  }
  //Хук UseMemo для того чтобы случайная сортировка кнопок категорий
  //не происходила при появлении всплыв-их подсказок (т.к. всплытие подск.
  //сопровождается изменением лок. state и => перерендер компонента и =>
  //каждый раз будет происходить новая случ.сорт.)
  const filters = useSelector(selectFilters)
  const mixCategories = useMemo(
    () => [...filters].sort(() => Math.random() - 0.5),
    [filters]
  );
  //Список кнопок который будет отображаться
  const renderedBtns = mixCategories.map((filter) => {
    const style = filter === currentFilter ? styles.black : false
    return (
      <button id={filter} key={filter} className={style} onClick={ (e)=> dispatch(setFilter(e.target.id)) } >
        {filter} 
      </button>
    )       
  });
  //return
  return (
    <div id='categories'  className={styles.filters}>

      <button id='leftBtn' className={styles.leftBtn} onClick={moveLeft} onMouseOver={showPrompt} onMouseLeave={hidePrompt} >
        <div className={classes.leftBtnPromptClass}>  
          Предыдущая  
        </div>
      </button>
      
      <div className = {styles.conteiner} ref={conteiner} >
        <div className = {styles.wrap} ref={wrap} style={{ marginLeft: marginLeftWrap}}>
          {renderedBtns}
        </div>
      </div>

      <button id='rightBtn' className={styles.rightBtn} onClick={moveRight} onMouseOver={showPrompt} onMouseLeave={hidePrompt}>
        <div className={classes.rightBtnPromptClass}> 
          Далее  
        </div>
      </button>

    </div>
  )
}


