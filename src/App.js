import React from 'react';
import { HeaderApp } from './features/headerApp/HeaderApp';
import { Filters } from './features/filters/Filters';
import { VideoList } from './features/videoList/VideoList';
import { Sidebar } from './features/sidebar/Sidebar';
import { HashRouter, Routes, Route  } from 'react-router-dom';
import styles from './App.module.css';
import { Inscription } from './features/inscription/Inscription';
import { VideoPage } from './features/videoPage/VideoPage';

function App() {
  return (
    // HashRouter вместо BrouesrRouter чтобы роутинг работал на gh-pages
    <HashRouter>
      <Inscription/>
      <Routes>
        <Route
          exact
          path="/" 
          element = {
            <div className = {styles.mainContainer}>
              <HeaderApp/>
              <Filters/>
              <Sidebar/>
              <VideoList location = 'inMain' />
            </div> 
          } 
        />
        <Route path = "/video/:id"  element = { <VideoPage/> } />
      </Routes>
    </HashRouter>
  );
}

export default App;