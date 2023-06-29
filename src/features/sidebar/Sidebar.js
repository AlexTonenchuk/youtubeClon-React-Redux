import React from 'react';
import styles from './Sidebar.module.css';


export function Sidebar() {

  return (
    <div className = {styles.sidebar}>
      
      <button
        className={`${styles.sidebarBtn} ${styles.main}`}
        placeholder='Главная'
        title='Главная'
      >
      </button>

      <button
        className={`${styles.sidebarBtn} ${styles.shorts}`}
        placeholder='Shorts'
        title='Shorts'
      >
      </button>

      <button
        className={`${styles.sidebarBtn} ${styles.subscription}`}
        placeholder='Подписки'
        title='Подписки'
      >
      </button>

      <button
        className={`${styles.sidebarBtn} ${styles.library}`}
        placeholder='Библиотека'
        title='Библиотека'
      >
      </button>

      <button
        className={`${styles.sidebarBtn} ${styles.history}`}
        placeholder='История'
        title='История'
      >
      </button>
    
    </div>
  );
  
}
