//generate the solution to the sodoku game
const Toolkit = require("./Toolkit");

module.exports = class Generator {

  generate(){
    while (!this.internalGenerate()) {
      //TODO

    }
  }

  internalGenerate(){

    this.matrix = Toolkit.matrix.makeMatrix();
    //first map generate a matrix with rows from 0 to 8 in order, then shuffle each row
    this.orders = Toolkit.matrix.makeMatrix()
      .map(row => row.map((v,i) => i))
      .map(row => Toolkit.matrix.shuffle(row));
    for(let n = 1; n<= 9; n++){
      if(!this.fillNumber(n)){
        return false;
      }
    }
    return true;
  }

  fillNumber(n){
    return this.fillRow(n,0);
  }

  fillRow(n, rowIndex){

    if(rowIndex > 8){
      return true;
    }

    const row = this.matrix[rowIndex];
    const orders = this.orders[rowIndex];
    for(let i = 0; i < 9; i++){
      const colIndex = orders[i];
      //if value already exists on this position, skip
      if(row[colIndex]){
        continue;
      }

      //check if this position can be filled with n,if not, skip
      if(!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex,colIndex)){
        continue;
      }
      row[colIndex] = n;
      //filling in next row with n, if failed, then search the next position in the current row
      if(!this.fillRow(n,rowIndex + 1)){
        row[colIndex] = 0;
        continue;
      };

      return true;
    }

    return false;
  }
}
