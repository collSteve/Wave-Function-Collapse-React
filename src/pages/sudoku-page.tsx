import React from 'react';
import logo from './logo.svg';
import { SudokuGrid, SudokuGridConstructInfoType, SudokuGridConstructMatrixInfo, SudokuGridConstructPosValueInfo } from '../models/SudokuGrid';
import appStyles from './sudoku-page.module.css';
import { type } from '@testing-library/user-event/dist/type';
import { visibleMatrixToCordMatrix } from '../utils/matrix';
import { SudokuCellType } from '../models/SudokuCell';

export default class SudokuPage extends React.Component<{}, {forceUpdate:number, possibleValuesOutput:number[]}> {

  sudokuGrid:SudokuGrid;
  constructor(props: {} | Readonly<{}>) {
    super(props);

    const constructInfo:SudokuGridConstructPosValueInfo = {constructInfo:new Map(), type:SudokuGridConstructInfoType.PosValue};
    constructInfo.constructInfo.set({x:1,y:1},3);
    constructInfo.constructInfo.set({x:2,y:2},1);
    constructInfo.constructInfo.set({x:3,y:3},2);
    constructInfo.constructInfo.set({x:4,y:4},4);
    constructInfo.constructInfo.set({x:5,y:5},5);

    const textM = [
      [5,3,0,0,7,0,0,0,0],
      [6,0,0,1,9,5,0,0,0],
      [0,9,8,0,0,0,0,6,0],
      [8,0,0,0,6,0,0,0,3],
      [4,0,0,8,0,3,0,0,1],
      [7,0,0,0,2,0,0,0,6],
      [0,6,0,0,0,0,2,8,0],
      [0,0,0,4,1,9,0,0,5],
      [0,0,0,0,8,0,0,7,9]
    ]; 
    /*
    [
        [5,3,0,0,0,0,0,0,0],
        [6,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [8,0,0,0,0,0,0,0,3],
        [4,0,0,0,0,0,0,0,1],
        [7,0,0,0,0,0,0,0,6],
        [0,6,0,0,0,0,0,8,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,8,0,0,7,0]
      ]
    */
    const constructMatrix:SudokuGridConstructMatrixInfo = {
      constructInfo:(textM),
      type:SudokuGridConstructInfoType.Matrix
    }

    this.sudokuGrid = new SudokuGrid(constructMatrix);
    this.state = {
      forceUpdate: 0,
      possibleValuesOutput:[]
    }
  }

  stepSolveSudoku() {
    this.sudokuGrid.solveStep();
    this.setState({...this.state, forceUpdate:this.state.forceUpdate+1});
  }

  setPossibleValuesOutput(x:number,y:number) {
    const cell = this.sudokuGrid.getCell(x,y);
    this.setState({possibleValuesOutput:cell.getPossibleValues()});
  }

  render() {
    let cells = [];

    for (let x=0; x<9; x++) {
      let row = [];
      for (let y=0; y<9; y++) {
        const cell = this.sudokuGrid.getCell(x,y);
        const cellStyle = {
          color: 'black',
          'fontWeight': 'bold'
        };

        if (cell.getCellType() === SudokuCellType.UserCell) {
          cellStyle.color = 'blue';
        } 
        row.push(<button style={cellStyle} onClick={()=>this.setPossibleValuesOutput(x,y)}>{cell.getDisplayNumber()}</button>);
      }
      cells.push(<div className='sudoku-row'>{[...row]}</div>)
    }
    

    return (
      <div className="SudokuPage">

        <h2>Cells:</h2>
        <div className={appStyles.sudoku_grid_container}>
          {cells}
        </div>

        <button onClick={()=>this.stepSolveSudoku()}>Step Solve</button>
        <p>rendered times: {this.state.forceUpdate}</p>

        <p>Possible Values: {this.state.possibleValuesOutput}</p>

      </div>
    );
  }
}
