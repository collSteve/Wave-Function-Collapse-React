import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import HomePage from './pages/home-page';
import SudokuPage from './pages/sudoku-page';
import WFCTilePage2D from './pages/2D-WFC-tile-page';
import {Routes, Route, BrowserRouter } from 'react-router-dom'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="sudoku" element={<SudokuPage />} />
        <Route path="WFC-tile-2d" element={<WFCTilePage2D gridWidth={10} gridHeight={10} />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
