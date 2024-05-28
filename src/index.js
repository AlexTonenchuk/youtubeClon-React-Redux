import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import './index.css';
import { loaded } from './features/videoList/videoListSlice';
import { videoList } from './data/data';


store.dispatch(loaded(videoList));
console.dir(store.getState())

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

//reportWebVitals();
