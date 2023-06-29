import React from 'react';
import { HeaderApp } from './features/headerApp/HeaderApp';
import { Categories } from './features/categories/Categories';
import { ListVideos } from './features/listVideos/ListVideos';
import { Sidebar } from './features/sidebar/Sidebar';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { TestCanal } from     './features/testCanal/TestCanal';
import { TestVideoPage } from './features/testVideoPage/TestVideoPage';
import styles from './App.module.css';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route 
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
            path="/one/:id" 
            element= { <TestCanal/>}
          />

          <Route 
            path="/watch/:id" 
            element= { <TestVideoPage/>}
          />


        </Routes>
      </BrowserRouter>
    );
}

export default App;













/*import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
*/