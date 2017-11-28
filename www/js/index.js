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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//toolkit for matrix and array
var matrixToolkit = {
  makeRow: function makeRow() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var array = new Array(9);
    array.fill(v);
    return array;
  },
  makeMatrix: function makeMatrix() {
    var _this = this;

    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return Array.from({ length: 9 }, function () {
      return _this.makeRow(v);
    });
  },


  //Fisher-Yates shuffle algorithom
  shuffle: function shuffle(array) {
    var endIndex = array.length - 2;
    for (var i = 0; i <= endIndex; i++) {
      var j = i + Math.floor(Math.random() * (array.length - 1));
      var _ref = [array[j], array[i]];
      array[i] = _ref[0];
      array[j] = _ref[1];

      return array;
    }
  },


  // check if the position could be filled with n
  checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
    //get row and col data
    var row = matrix[rowIndex];
    var column = this.makeRow().map(function (v, i) {
      return matrix[i][colIndex];
    });
    // get the boxIndex

    var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
        boxIndex = _boxToolkit$convertTo.boxIndex;
    //get the box data


    var box = boxToolkit.getBoxCells(matrix, boxIndex);

    for (var i = 0; i < 9; i++) {
      if (row[i] === n || column[i] === n || box[i] === n) {
        return false;
      }
    }

    return true;
  }
};

//the coordinate system toolkit for box
var boxToolkit = {
  getBoxCells: function getBoxCells(matrix, boxIndex) {
    var startRowIndex = Math.floor(boxIndex / 3) * 3;
    var startColIndex = boxIndex % 3 * 3;
    var result = [];
    for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
      var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      var colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex]);
    }
    return result;
  },
  convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    };
  },
  convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    };
  }
};

module.exports = function () {
  function Toolkit() {
    _classCallCheck(this, Toolkit);
  }

  _createClass(Toolkit, null, [{
    key: "matrix",

    //matrix and array related toolkit
    get: function get() {
      return matrixToolkit;
    }

    //the coordinate system toolkit for box

  }, {
    key: "box",
    get: function get() {
      return boxToolkit;
    }
  }]);

  return Toolkit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(2);
var PopupNumbers = __webpack_require__(7);

var grid = new Grid($("#container"));
grid.build();
grid.layout();

var popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

$("#check").on("click", function (e) {
  if (grid.check()) {
    alert("success!");
  }
});
$("#reset").on("click", function (e) {
  grid.reset();
});
$("#clear").on("click", function (e) {
  grid.clear();
});
$("#rebuild").on("click", function (e) {
  grid.rebuild();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// generate the grid layout
var Toolkit = __webpack_require__(0);
var Sodoku = __webpack_require__(3);
var Checker = __webpack_require__(6);

var Grid = function () {
  function Grid(container) {
    _classCallCheck(this, Grid);

    this._$container = container;
  }

  _createClass(Grid, [{
    key: "build",
    value: function build() {
      var sodoku = new Sodoku();
      sodoku.make();
      var matrix = sodoku.puzzleMatrix;

      var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
      var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

      var $cells = matrix.map(function (rowValues) {
        return rowValues.map(function (cellValue, colIndex) {
          return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty").text(cellValue);
        });
      });

      var $divArray = $cells.map(function ($spanArray, rowIndex) {
        return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
      });

      this._$container.append($divArray);
    }
  }, {
    key: "layout",
    value: function layout() {
      // adjust the height based on the width
      var width = $("span:first", this._$container).width();
      $("span", this._$container).height(width).css({
        "line-height": '${width}px',
        "font-size": width < 32 ? '${width / 2}px' : ""
      });
    }

    //check user's solution, if fail, mark the wrong position

  }, {
    key: "check",
    value: function check() {
      //get the data from the pannel
      var $rows = this._$container.children();
      var data = $rows.map(function (rowIndex, div) {
        return $(div).children().map(function (colIndex, span) {
          return parseInt($(span).text() || 0);
        });
      }).toArray().map(function ($data) {
        return $data.toArray();
      });
      var checker = new Checker(data);
      if (checker.check()) {
        return true;
      }
      //when it did not pass, mark the Grid
      var marks = checker.matrixMarks;
      this._$container.children().each(function (rowIndex, div) {
        $(div).children().each(function (colIndex, span) {
          var $span = $(span);
          if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
            $span.removeClass("error");
          } else {
            $span.addClass("error");
          }
        });
      });
    }
    //reset the pannel to initial status

  }, {
    key: "reset",
    value: function reset() {
      this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass("empty").text(0);
    }
    //clear the marks made by users

  }, {
    key: "clear",
    value: function clear() {
      this._$container.find("span.error").removeClass("error mark1 mark2");
    }
    //create a new panel

  }, {
    key: "rebuild",
    value: function rebuild() {
      this._$container.empty();
      this.build();
      this.layout();
    }
  }, {
    key: "bindPopup",
    value: function bindPopup(popupNumbers) {
      this._$container.on("click", "span", function (e) {
        var $cell = $(e.target);
        if ($cell.is(".fixed")) {
          return;
        }
        popupNumbers.popup($cell);
      });
    }
  }]);

  return Grid;
}();

module.exports = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//generate the sodoku game
//1 generate the fully finished solution grid with Generator
//2 randomly remove some data

var Generator = __webpack_require__(4);

module.exports = function () {
  function Sodoku() {
    _classCallCheck(this, Sodoku);

    //generate the fully finished solution grid
    var generator = new Generator();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  _createClass(Sodoku, [{
    key: "make",
    value: function make() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

      //randomly remove some date
      this.puzzleMatrix = this.solutionMatrix.map(function (row) {
        return row.map(function (cell) {
          return Math.random() * 9 < level ? 0 : cell;
        });
      });
    }
  }]);

  return Sodoku;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//generate the solution to the sodoku game
var Toolkit = __webpack_require__(5);

module.exports = function () {
  function Generator() {
    _classCallCheck(this, Generator);
  }

  _createClass(Generator, [{
    key: "generate",
    value: function generate() {
      while (!this.internalGenerate()) {
        //TODO

      }
    }
  }, {
    key: "internalGenerate",
    value: function internalGenerate() {

      this.matrix = Toolkit.matrix.makeMatrix();
      //first map generate a matrix with rows from 0 to 8 in order, then shuffle each row
      this.orders = Toolkit.matrix.makeMatrix().map(function (row) {
        return row.map(function (v, i) {
          return i;
        });
      }).map(function (row) {
        return Toolkit.matrix.shuffle(row);
      });
      for (var n = 1; n <= 9; n++) {
        if (!this.fillNumber(n)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: "fillNumber",
    value: function fillNumber(n) {
      return this.fillRow(n, 0);
    }
  }, {
    key: "fillRow",
    value: function fillRow(n, rowIndex) {

      if (rowIndex > 8) {
        return true;
      }

      var row = this.matrix[rowIndex];
      var orders = this.orders[rowIndex];
      for (var i = 0; i < 9; i++) {
        var colIndex = orders[i];
        //if value already exists on this position, skip
        if (row[colIndex]) {
          continue;
        }

        //check if this position can be filled with n,if not, skip
        if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
          continue;
        }
        row[colIndex] = n;
        //filling in next row with n, if failed, then search the next position in the current row
        if (!this.fillRow(n, rowIndex + 1)) {
          row[colIndex] = 0;
          continue;
        };

        return true;
      }

      return false;
    }
  }]);

  return Generator;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//toolkit for matrix and array
var matrixToolkit = {
  makeRow: function makeRow() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var array = new Array(9);
    array.fill(v);
    return array;
  },
  makeMatrix: function makeMatrix() {
    var _this = this;

    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return Array.from({ length: 9 }, function () {
      return _this.makeRow(v);
    });
  },


  //Fisher-Yates shuffle algorithom
  shuffle: function shuffle(array) {
    var endIndex = array.length - 2;
    for (var i = 0; i <= endIndex; i++) {
      var j = i + Math.floor(Math.random() * (array.length - 1));
      var _ref = [array[j], array[i]];
      array[i] = _ref[0];
      array[j] = _ref[1];

      return array;
    }
  },


  // check if the position could be filled with n
  checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
    //get row and col data
    var row = matrix[rowIndex];
    var column = this.makeRow().map(function (v, i) {
      return matrix[i][colIndex];
    });
    // get the boxIndex

    var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
        boxIndex = _boxToolkit$convertTo.boxIndex;
    //get the box data


    var box = boxToolkit.getBoxCells(matrix, boxIndex);

    for (var i = 0; i < 9; i++) {
      if (row[i] === n || column[i] === n || box[i] === n) {
        return false;
      }
    }

    return true;
  }
};

//the coordinate system toolkit for box
var boxToolkit = {
  getBoxCells: function getBoxCells(matrix, boxIndex) {
    var startRowIndex = Math.floor(boxIndex / 3) * 3;
    var startColIndex = boxIndex % 3 * 3;
    var result = [];
    for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
      var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      var colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex]);
    }
    return result;
  },
  convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    };
  },
  convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    };
  }
};

module.exports = function () {
  function Toolkit() {
    _classCallCheck(this, Toolkit);
  }

  _createClass(Toolkit, null, [{
    key: "matrix",

    //matrix and array related toolkit
    get: function get() {
      return matrixToolkit;
    }

    //the coordinate system toolkit for box

  }, {
    key: "box",
    get: function get() {
      return boxToolkit;
    }
  }]);

  return Toolkit;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//check the solution of the sodoku game
function checkArray(array) {
  var length = array.length;
  var marks = new Array(length);
  marks.fill(true);
  for (var i = 0; i < length; i++) {
    //if this position has already been checked and marked false, skip
    if (!marks[i]) {
      continue;
    }
    var v = array[i];
    //check if the value is not 0
    if (!v) {
      marks[i] = false;
      continue;
    }
    //check if there multiple same value
    for (var j = i + 1; j < length - 1; j++) {
      if (v === array[j]) {
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

var Toolkit = __webpack_require__(0);
module.exports = function () {
  function Checker(matrix) {
    _classCallCheck(this, Checker);

    this._matrix = matrix;
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
  }

  _createClass(Checker, [{
    key: "check",
    value: function check() {
      this.checkRows();
      this.checkCols();
      this.checkBoxes();

      //check if it passes the check
      this._success = this._matrixMarks.every(function (row) {
        return row.every(function (mark) {
          return mark;
        });
      });
      return this._success;
    }
  }, {
    key: "checkRows",
    value: function checkRows() {
      for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
        var row = this._matrix[rowIndex];
        var marks = checkArray(row);
        for (var colIndex = 0; colIndex < marks.length; colIndex++) {
          if (!marks[colIndex]) {
            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: "checkCols",
    value: function checkCols() {
      for (var colIndex = 0; colIndex < 9; colIndex++) {
        var cols = [];
        for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
          cols[colIndex] = this._matrix[rowIndex][colIndex];
        }
        var marks = checkArray(cols);
        for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
          if (!marks[colIndex]) {
            this._matrixMarks[_rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: "checkBoxes",
    value: function checkBoxes() {
      for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
        var box = Toolkit.box.getBoxCells(this._matrix, boxIndex);
        var marks = checkArray(box);
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
          if (!marks[cellIndex]) {
            var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex),
                rowIndex = _Toolkit$box$convertF.rowIndex,
                colIndex = _Toolkit$box$convertF.colIndex;

            this._matrix[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: "matrixMarks",
    get: function get() {
      return this._matrixMarks;
    }
  }, {
    key: "isSuccess",
    get: function get() {
      return this._success;
    }
  }]);

  return Checker;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// deal with the popup operation panel
module.exports = function () {
  function PopupNumbers($panel) {
    var _this = this;

    _classCallCheck(this, PopupNumbers);

    this._$panel = $panel.hide().removeClass("hidden");
    this._$panel.on("click", "span", function (e) {
      var $span = $(e.target);
      var $cell = _this._$targetCell;
      //fill in the style mark
      if ($span.hasClass("mark1")) {
        if ($cell.hasClass("mark1")) {
          $cell.removeClass("mark1");
        } else {
          $cell.removeClass("mark2").addClass("mark1");
        }
      } else if ($span.hasClass("mark2")) {
        if ($cell.hasClass("mark2")) {
          $cell.removeClass("mark2");
        } else {
          $cell.removeClass("mark1").addClass("mark2");
        }
      } else if ($span.hasClass("empty")) {
        //clear the number and mark when click on empty
        $cell.text(0).addClass("empty");
      } else {
        //fill in the numbers
        $cell.removeClass("empty").text($span.text());
      }
      _this.hide();
    });
  }

  _createClass(PopupNumbers, [{
    key: "popup",
    value: function popup($cell) {
      this._$targetCell = $cell;

      var _$cell$position = $cell.position(),
          left = _$cell$position.left,
          top = _$cell$position.top;

      this._$panel.css({
        left: left + 'px',
        top: top + 'px'
      }).show();
    }
  }, {
    key: "hide",
    value: function hide() {
      this._$panel.hide();
    }
  }]);

  return PopupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map