
import { expect } from 'chai';
import { SudokuCell, UserSudokuCell } from './SudokuCell';

describe("Sudoku Cell Test", ()=>{
    
    beforeEach(()=>{
    })

    it("Testing Deduct Value", ()=> {
        let cell1:SudokuCell = new UserSudokuCell();
        cell1.deductValue(1);
        // eslint-disable-next-line jest/valid-expect
        expect(cell1.getPossibleValues()).to.eql([2,3,4,5,6,7,8,9]);
    })
});