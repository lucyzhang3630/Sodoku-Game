//check the solution of the sodoku game
function checkArray(array){
  const length = array.length;
  const marks = new Array(length);
  marks.fill(true);
  for(let i = 0; i < length; i++){
    //if this position has already been checked and marked false, skip
    if(!marks[i]){
      continue;
    }
    const v = array[i];
    //check if the value is not 0
    if(!v){
      marks[i] = false;
      continue;
    }
    //check if there multiple same value
    for(let j = i + 1; j < length - 1; j++){
      if(v===array[j]){
        marks[i] = marks[j] = false;
        continue;
      }
    }
  }
  return marks;
};

//Input : a 9*9 matrix filled by the user
//Process : check the row, column and box of the matrix, and fill in the marks
//Output : marks and if it passes the check

const Toolkit = require("./toolkit");
module.exports = class Checker {
  constructor(matrix){
    this._matrix = matrix;
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
  }

  get matrixMarks(){
    return this._matrixMarks;
  }

  get isSuccess(){
    return this._success;
  }
  check(){
    this.checkRows();
    this.checkCols();
    this.checkBoxes();

    //check if it passes the check
    this._success = this._matrixMarks.every(row => row.every(mark => mark));
    return this._success;
  }

  checkRows(){
    for(let rowIndex = 0; rowIndex < 9; rowIndex++){
      const row = this._matrix[rowIndex];
      const marks = checkArray(row);
      for(let colIndex = 0; colIndex < marks.length; colIndex++){
        if(!marks[colIndex]){
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkCols(){
    for(let colIndex = 0; colIndex < 9; colIndex++){
      const cols = [];
      for(let rowIndex = 0; rowIndex < 9; rowIndex++){
        cols[colIndex] = this._matrix[rowIndex][colIndex];
      }
      const marks = checkArray(cols);
      for(let rowIndex = 0; rowIndex < marks.length; rowIndex++){
        if(!marks[colIndex]){
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkBoxes(){
    for(let boxIndex = 0; boxIndex < 9; boxIndex++){
      const box = Toolkit.box.getBoxCells(this._matrix,boxIndex);
      const marks = checkArray(box);
      for(let cellIndex = 0; cellIndex < 9; cellIndex++){
        if(!marks[cellIndex]){
          const { rowIndex, colIndex} = Toolkit.box.convertFromBoxIndex(boxIndex,cellIndex);
          this._matrix[rowIndex][colIndex] = false;
        }
      }
    }
  }
}
