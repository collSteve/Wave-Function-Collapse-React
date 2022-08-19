import React from 'react';
import './App.css';
import { SudokuGrid, SudokuGridConstructInfoType, SudokuGridConstructMatrixInfo, SudokuGridConstructPosValueInfo } from './models/SudokuGrid';
import appStyles from './app.module.css';
import { type } from '@testing-library/user-event/dist/type';
import { visibleMatrixToCordMatrix } from './utils/matrix';
import { SudokuCellType } from './models/SudokuCell';

import { Outlet, Link } from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/sudoku">sudoku</Link>
          <Link to="/WFC-tile-2d">2D WFC</Link>
        </nav>

        <Outlet></Outlet>
      </div>
    );
  }
}

export default App;
