import React from 'react';
import { HeaderApp } from './features/headerApp/HeaderApp';
import { Categories } from './features/categories/Categories';
import { ListVideos } from './features/listVideos/ListVideos';
import { Sidebar } from './features/sidebar/Sidebar';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { TestCanal } from './features/testCanal/TestCanal';
import styles from './App.module.css';
import { VideoMain } from './features/videoMain/VideoMain';

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
                  <ListVideos/>
                </div>
              </div> 
            } 
          />

          <Route 
            
            path="/video/:id" 
            element= {<VideoMain/>}
          />

        </Routes>
      </BrowserRouter>
    );
}

export default App;







