import { emptyMatrix } from "../utils/matrix";
import { getDiscreteRangeInclusive } from "../utils/range";
import { FixedSudokuCell, SudokuCell, UserSudokuCell } from "./SudokuCell";

export enum SudokuGridConstructInfoType {
    PosValue,
    Matrix
}

export type SudokuGridConstructPosValueInfo = {
    constructInfo:Map<{x:number,y:number},number>,
    type:SudokuGridConstructInfoType.PosValue
}
export type SudokuGridConstructMatrixInfo = {
    constructInfo:(number|null)[][],
    type:SudokuGridConstructInfoType.Matrix
}
export class SudokuGrid {
    private sudokuCells: SudokuCell[][];

    constructor(constructValueInfo:SudokuGridConstructMatrixInfo) {
        this.sudokuCells = [];
        this.constructByMatrix(constructValueInfo);
    }

    constructByPosValue(constructValueInfo:SudokuGridConstructPosValueInfo) {
        this.sudokuCells = emptyMatrix<SudokuCell>(9,9,()=>new UserSudokuCell());
        for (const [pos,value] of constructValueInfo.constructInfo) {
            if (pos.x<9 && pos.x>=0 && pos.y<9 && pos.y>0) {
                this.sudokuCells[pos.x][pos.y] = new FixedSudokuCell(value);
            }
        }
    }

    constructByMatrix(constructValueInfo:SudokuGridConstructMatrixInfo) {
        this.sudokuCells = emptyMatrix<SudokuCell>(9,9,()=>new UserSudokuCell());
        for (let x=0; x<9; x++) {
            for (let y=0; y<9; y++) {
                const value = constructValueInfo.constructInfo[x][y];
                if (value && value>=0 && value<9) {
                    this.sudokuCells[x][y] = new FixedSudokuCell(value);
                }
            }
        }
    }

    getCell(x:number,y:number) {
        return this.sudokuCells[x][y];
    }

    solveStep() {
        // row
        this.solveRows();
        // cols
        this.solveCols();
        // square
        this.solveSquare();
    }

    solveCols() {
        for (let x=0; x<9; x++) {
            const solvedValues = [];
            for (let y=0; y<9; y++) {
                const cell = this.getCell(x,y);
                if (cell.isSolved()) {
                    solvedValues.push(cell.getValue());
                }
            }

            // deduct cell
            for (let y=0; y<9; y++) {
                const cell = this.getCell(x,y);
                for (const nValue of solvedValues) {
                    cell.deductValue(nValue);
                }
                
            }
        }
    }

    solveRows() {
        for (let y=0; y<9; y++) {
            const solvedValues = [];
            for (let x=0; x<9; x++) {
                const cell = this.getCell(x,y);
                if (cell.isSolved()) {
                    solvedValues.push(cell.getValue());
                }
            }

            // deduct cell
            for (let x=0; x<9; x++) {
                for (const nValue of solvedValues) {
                    const cell = this.getCell(x,y);
                    cell.deductValue(nValue);
                }
                
            }
        }
    }

    solveSquare() {
        // set up ranges for 9 big squares
        const ranges = [];
        for (let x=0; x<=6; x+=3) {
            for (let y=0; y<=6; y+=3) {
                ranges.push(getDiscreteRangeInclusive({x:x,y:y}, {x:x+2,y:y+2}));
            }
        }

        // loop through each big square 
        for (const range of ranges) {
            // get solved values
            const solvedValues = []
            for (const cord of range) {
                const cell = this.getCell(cord.x, cord.y);
                if (cell.isSolved()) {
                    solvedValues.push(cell.getValue());
                }
            }
            // deduct
            for (const cord of range) {
                const cell = this.getCell(cord.x, cord.y);
                for (const nValue of solvedValues) {
                    cell.deductValue(nValue);
                }
            }
        }

    }
}