import React from 'react';
import { HeaderApp } from './features/headerApp/HeaderApp';
import { Categories } from './features/categories/Categories';
import { ListVideos } from './features/listVideos/ListVideos';
import { Sidebar } from './features/sidebar/Sidebar';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import styles from './App.module.css';
import { Video } from './features/video/Video';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/" 
          element = {
            <div className="App">
              <HeaderApp/>
              <Categories/>
              <div className = {styles.rowFlexContainer}>
                <Sidebar/>
                <ListVideos 
                  location='inMain'
                />
              </div>
            </div> 
          } 
        />

        <Route 
          path="/video/:id" 
          element={
            <Video
              location='inVideoPage'
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;







