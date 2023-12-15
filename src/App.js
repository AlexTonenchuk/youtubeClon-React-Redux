import React from 'react';
import { HeaderApp } from './features/headerApp/HeaderApp';
import { Filters } from './features/filters/Filters';
import { VideoList } from './features/videoList/VideoList';
import { Sidebar } from './features/sidebar/Sidebar';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import styles from './App.module.css';
import { Video } from './features/video/Video';
import { Search } from './features/search/Search';
import { Inscription } from './features/inscription/Inscription';

function App() {

  return (
    <BrowserRouter>
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
              <div>
                <Video location = 'inVideoPage' />
                <VideoList location = 'inVideoPage' />
              </div>
              
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;







