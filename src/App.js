import React from 'react';
import { HeaderApp } from './features/headerApp/HeaderApp';
import { Filters } from './features/filters/Filters';
import { VideoList } from './features/videoList/VideoList';
import { Sidebar } from './features/sidebar/Sidebar';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import styles from './App.module.css';
import { Video } from './features/video/Video';
import { Search } from './features/search/Search';

function App() {

  return (
    <BrowserRouter>
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
            <div className = {styles.container} >
              <HeaderApp/>
              <Video location = 'inVideoPage' />
              <VideoList location = 'inVideoPage' />
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;







