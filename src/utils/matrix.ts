export function emptyMatrix<T>(nRows:number, nCols:number, v:()=>T) {
    const matrix:T[][] = [];
    for (let x=0; x<nRows; x++) {
        matrix.push([]);
        for (let y=0; y<nCols; y++) {
            matrix[x].push(v());
        }
    }
    return matrix;
}

export function visibleMatrixToCordMatrix<T>(matrix:T[][]) {
    const result = emptyMatrix(matrix[0].length, matrix.length, ()=>matrix[0][0]);

    for (let x=0; x<matrix.length; x++) {
        for (let y=0; y<matrix[0].length; y++) {
            result[y][x] = matrix[x][y];
        }
    }
    return result;
}
