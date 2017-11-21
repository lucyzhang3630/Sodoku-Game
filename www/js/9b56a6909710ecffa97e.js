/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const matrixToolkit = {
  makeRow(v=0){
    const row = array(9);
    array.fill(v);
    return row;
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
  }

}

module.exports = matrixToolkit;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(0);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const toolkit = __webpack_require__(0);

class Grid {
  constructor(container) {
    this._$container = container;
  }

  build(){
    const matrix = toolkit.makeMatrix();

    const $cells = matrix.map(rowValues => rowValues.map(cellValue => {
      return $("<span>").text(cellValue);
    }));

    const $divArray = $cells.map($spanArray => {
      return $("<div>").append($spanArray);
    })

    this._$container.append($divArray);
  }
}


new Grid($("#container")).build();


/***/ })
/******/ ]);