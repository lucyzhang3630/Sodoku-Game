//generate the sodoku game
//1 generate the fully finished solution grid with Generator
//2 randomly remove some data

const Generator = require("./generator");

module.exports = class Sodoku{
  constructor(){
    //generate the fully finished solution grid
    const generator = new Generator();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  make(level=5){
    //randomly remove some date
    this.puzzleMatrix = this.solutionMatrix.map(row => row.map(cell =>{
      return Math.random()*9 < level ? 0:cell
    }))
  }
}
