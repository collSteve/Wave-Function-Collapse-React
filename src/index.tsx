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
import { TileSetStructureFileReader } from './app/WFC/persistence/tile-set-structure-file-reader';

const DI = {
  wfc_store: new WFCStore()
}

const rawDefaultArgs: RawTileArgs = {
  imageAddress: process.env.PUBLIC_URL + '/source-files/default-image-1.png',
}

const defaultId = DI.wfc_store.rawTileContainer.addDefaultTile(rawDefaultArgs);

// const rawId1 = DI.wfc_store.rawTileContainer.addTileByImageAddress('https://play-lh.googleusercontent.com/p6kS3dCcILt9Z4vRMxHXZTbRecqnZTx5ysBVp6Qe3fDofokRLuWjRxF8J0TkMTG2gKo');


DI.wfc_store.rawTileContainer.getTileById(defaultId).setConnectionByArray([['NULL'],['NULL'],['NULL'],['NULL']]);

/*
const rawIdb1 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Circles/b_half.png');
const rawIdb2 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Circles/b_i.png');
const rawIdb3 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Circles/b_quarter.png');
const rawIdb4 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Circles/b.png');

const rawIdw1 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Circles/w_half.png');
const rawIdw2 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Circles/w_i.png');
const rawIdw3 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Circles/w_quarter.png');
const rawIdw4 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Circles/w.png');

DI.wfc_store.rawTileContainer.getTileById(rawIdb1).setConnectionByArray([["B"],['A'],['A'],['A']]);

DI.wfc_store.rawTileContainer.getTileById(rawIdb2).setConnectionByArray([["B"],['A'],['B'],['A']]);

DI.wfc_store.rawTileContainer.getTileById(rawIdb3).setConnection(MetricDirection2D.UP, ["B"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdb3).setConnection(MetricDirection2D.RIGHT, ["B"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdb3).setConnection(MetricDirection2D.DOWN, ["A"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdb3).setConnection(MetricDirection2D.LEFT, ["A"]);

DI.wfc_store.rawTileContainer.getTileById(rawIdb4).setConnection(MetricDirection2D.UP, ["B"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdb4).setConnection(MetricDirection2D.RIGHT, ["B"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdb4).setConnection(MetricDirection2D.DOWN, ["B"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdb4).setConnection(MetricDirection2D.LEFT, ["B"]);

DI.wfc_store.rawTileContainer.getTileById(rawIdw1).setConnection(MetricDirection2D.UP, ["A"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdw1).setConnection(MetricDirection2D.RIGHT, ["B"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdw1).setConnection(MetricDirection2D.DOWN, ["B"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdw1).setConnection(MetricDirection2D.LEFT, ["B"]);

DI.wfc_store.rawTileContainer.getTileById(rawIdw2).setConnection(MetricDirection2D.UP, ["A"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdw2).setConnection(MetricDirection2D.RIGHT, ["B"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdw2).setConnection(MetricDirection2D.DOWN, ["A"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdw2).setConnection(MetricDirection2D.LEFT, ["B"]);

DI.wfc_store.rawTileContainer.getTileById(rawIdw3).setConnection(MetricDirection2D.UP, ["A"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdw3).setConnection(MetricDirection2D.RIGHT, ["A"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdw3).setConnection(MetricDirection2D.DOWN, ["B"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdw3).setConnection(MetricDirection2D.LEFT, ["B"]);

DI.wfc_store.rawTileContainer.getTileById(rawIdw4).setConnection(MetricDirection2D.UP, ["A"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdw4).setConnection(MetricDirection2D.RIGHT, ["A"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdw4).setConnection(MetricDirection2D.DOWN, ["A"]);
DI.wfc_store.rawTileContainer.getTileById(rawIdw4).setConnection(MetricDirection2D.LEFT, ["A"]);
*/

// const rawIdk1 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Knots/corner.png');
// const rawIdk2 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Knots/cross.png');
// const rawIdk3 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Knots/empty.png');
// const rawIdk4 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Knots/line.png');
// const rawIdk5 = DI.wfc_store.rawTileContainer.addTileByImageAddress(process.env.PUBLIC_URL + '/source-files/tilesets/Knots/t.png');

// DI.wfc_store.rawTileContainer.getTileById(rawIdk1).setConnectionByArray([["B"],['B'],['A'],['A']]);
// DI.wfc_store.rawTileContainer.getTileById(rawIdk2).setConnectionByArray([["B"],['B'],['B'],['B']]);
// DI.wfc_store.rawTileContainer.getTileById(rawIdk3).setConnectionByArray([["A"],['A'],['A'],['A']]);
// DI.wfc_store.rawTileContainer.getTileById(rawIdk4).setConnectionByArray([["A"],['B'],['A'],['B']]);
// DI.wfc_store.rawTileContainer.getTileById(rawIdk5).setConnectionByArray([["A"],['B'],['B'],['B']]);

TileSetStructureFileReader.readFromJSON(`${process.env.PUBLIC_URL}/source-files/tilesets/Circuit`,
  "structure.json", DI.wfc_store.rawTileContainer).then(()=>{

    
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
        <Route path="WFC-tile-2d" element={<WFCTilePage2D gridWidth={20} gridHeight={20} wfcStore={DI.wfc_store} />} />
        <Route path="WFC-raw-tile-2d" element={<WFCTRawTilePage2D rawTileContainer={DI.wfc_store.rawTileContainer} />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

});


