import React from 'react';
import './App.css';

import { Outlet, Link } from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/sudoku">sudoku</Link>
          <Link to="/WFC-tile-2d">2D WFC</Link>
          <Link to="/WFC-raw-tile-2d">2D WFC Raw Tile</Link>
        </nav>

        <Outlet></Outlet>
      </div>
    );
  }
}

export default App;
