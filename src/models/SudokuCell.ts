export enum SudokuCellType {
    FixedCell,
    UserCell
};

export abstract class SudokuCell{
    protected solved:boolean = false;
    protected possibleValues:number[] = [1,2,3,4,5,6,7,8,9];
    protected cellType: SudokuCellType = SudokuCellType.FixedCell;

    public getPossibleLength() {
        return this.possibleValues.length;
    }

    public getDisplayNumber() {
        if (this.getPossibleLength() > 1) return 0;
        if (this.getPossibleLength() <= 0) return -1;

        return this.possibleValues[0];
    }

    public isSolved() {
        return this.solved;
    }

    public deductValue(value:number) {
        if (this.getPossibleLength()<=1 || this.isSolved()) return;

        this.possibleValues = this.possibleValues.filter((v)=>v!==value);

        if (this.getPossibleLength() === 1) this.solved = true;
    }

    public getValue() {
        if (this.getPossibleLength() === 1) return this.possibleValues[0];

        throw new Error("Unsolved Cell");
    }

    public getPossibleValues() {
        return [...this.possibleValues];
    }

    public getCellType() {
        return this.cellType;
    }
}

export class FixedSudokuCell extends SudokuCell {
    constructor(cellValue:number) {
        super();
        this.possibleValues = [cellValue];
        this.cellType = SudokuCellType.FixedCell;
        this.solved = true;
    }
}

export class UserSudokuCell extends SudokuCell {
    constructor() {
        super();
        this.cellType = SudokuCellType.UserCell;
        this.solved = false;
    }
}