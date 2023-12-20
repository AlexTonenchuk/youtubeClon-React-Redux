import React from 'react';
import { HeaderApp } from './features/headerApp/HeaderApp';
import { Filters } from './features/filters/Filters';
import { VideoList } from './features/videoList/VideoList';
import { Sidebar } from './features/sidebar/Sidebar';
import { HashRouter, Routes, Route  } from 'react-router-dom';
import styles from './App.module.css';
import { Video } from './features/video/Video';
import { Inscription } from './features/inscription/Inscription';

function App() {

  return (
    <HashRouter>
      <Inscription/>
      <Routes>
        <Route
          exact
          path="/" 
          element = {
            <div>
              <HeaderApp/>
              <Filters/>
              <Sidebar/>
              <VideoList location = 'inMain' />
            </div> 
          } 
        />

        <Route 
          path = "/video/:id" 
          element = { 
            <div className = {styles.mainContainer} >
              <HeaderApp/>
              <div className={styles.container}>
                <Video location = 'inVideoPage' />
                <VideoList location = 'inVideoPage' />
              </div>
              
            </div>
          }
        />

      </Routes>
    </HashRouter>
  );
}

export default App;







