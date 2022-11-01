import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import HomePage from './pages/home-page';
import SudokuPage from './pages/sudoku-page';
import WFCTilePage2D from './pages/2D-WFC-tile-page';
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import { WFCStore } from './app/services/wfc-raw-tile-container';
import { RawTileArgs } from './app/WFC/models/rawTile';
import WFCTRawTilePage2D from './pages/2D-raw-tile-page';
import { MetricDirection2D } from './utils/enums';

const DI = {
  wfc_store: new WFCStore()
}

const rawDefaultArgs: RawTileArgs = {
  imageAddress: process.env.PUBLIC_URL + '/source-files/default-image-1.png',
}

const defaultId = DI.wfc_store.rawTileContainer.addDefaultTile(rawDefaultArgs);

const rawId1 = DI.wfc_store.rawTileContainer.addTileByImageAddress('https://play-lh.googleusercontent.com/p6kS3dCcILt9Z4vRMxHXZTbRecqnZTx5ysBVp6Qe3fDofokRLuWjRxF8J0TkMTG2gKo');

DI.wfc_store.rawTileContainer.getTileById(defaultId).setConnection(MetricDirection2D.UP, ["A"]);
DI.wfc_store.rawTileContainer.getTileById(rawId1).setConnection(MetricDirection2D.DOWN, ["A"]);

DI.wfc_store.rawTileContainer.initializaConnectorTileMap();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="sudoku" element={<SudokuPage />} />
        <Route path="WFC-tile-2d" element={<WFCTilePage2D gridWidth={10} gridHeight={10} wfcStore={DI.wfc_store} />} />
        <Route path="WFC-raw-tile-2d" element={<WFCTRawTilePage2D rawTileContainer={DI.wfc_store.rawTileContainer} />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
