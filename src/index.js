import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Api } from './components/Api';
import { Song } from './components/Song';
import { Summary } from './components/Summary';
import { MyMusic } from './components/MyMusic';
import { SongStat } from './components/SongStat';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/api",
    element: <Api />,
  },
  {
    path: "/song",
    element: <Song />,
  },
  {
    path: "/summary",
    element: <Summary />,
  },
  {
    path: "/stats/:songID",
    element: <SongStat/>
  },
  {
    path: "/mymusic",
    element: <MyMusic />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
