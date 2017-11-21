//toolkit for matrix and array
const matrixToolkit = {
  makeRow(v=0){
    const array = new Array(9);
    array.fill(v);
    return array;
  },

  makeMatrix(v=0){
    return Array.from({ length:9 },() => this.makeRow(v));
  },

  //Fisher-Yates shuffle algorithom
  shuffle(array){
    const endIndex = array.length-2;
    for(let i = 0 ; i <= endIndex ; i++){
      const j = i + Math.floor(Math.random()*(array.length - 1));
      [array[i],array[j]] = [array[j],array[i]];
      return array;
    }
  },

  // check if the position could be filled with n
  checkFillable(matrix, n, rowIndex, colIndex){
    //get row and col data
    const row = matrix[rowIndex];
    const column = this.makeRow().map((v,i) => matrix[i][colIndex]);
    // get the boxIndex
    const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex,colIndex);
    //get the box data
    const box = boxToolkit.getBoxCells(matrix,boxIndex);

    for(let i = 0; i < 9; i++){
      if(row[i]===n||column[i]===n||box[i]===n){
        return false;
      }
    }

    return true;
  }

}

//the coordinate system toolkit for box
const boxToolkit = {
  getBoxCells(matrix,boxIndex){
    const startRowIndex = Math.floor(boxIndex / 3) *3;
    const startColIndex = boxIndex % 3 * 3;
    const result = [];
    for(let cellIndex = 0; cellIndex < 9; cellIndex++){
      const rowIndex = startRowIndex + Math.floor( cellIndex / 3);
      const colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex]);
    }
    return result;
  },
  convertToBoxIndex(rowIndex,colIndex){
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    }
  },

  convertFromBoxIndex(boxIndex,cellIndex){
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 +cellIndex % 3
    }
  }
};

module.exports = class Toolkit {
  //matrix and array related toolkit
  static get matrix() {
    return matrixToolkit;
  }

  //the coordinate system toolkit for box
  static get box() {
    return boxToolkit;
  }
};
