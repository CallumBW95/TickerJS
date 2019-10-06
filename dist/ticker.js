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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ticker.js":
/*!***********************!*\
  !*** ./src/ticker.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n(function () {\n  class ticker {\n    constructor(options) {\n      _defineProperty(this, \"state\", {\n        active: true,\n        progress: 0,\n        imagesLoaded: false\n      });\n\n      _defineProperty(this, \"options\", {\n        el: document.querySelector(\"[data-ticker\"),\n        fps: 60,\n        speed: \"slow\",\n        // slow, medium, fast,\n        width: 0\n      });\n\n      _defineProperty(this, \"intervals\", {\n        movement: \"\",\n        preload: \"\"\n      });\n\n      if (typeof options === \"object\") {\n        Object.keys(this.options).map(key => {\n          if (this.options[key] && options[key]) {\n            this.options[key] = options[key];\n          }\n        });\n      }\n\n      this.preLoadImages();\n    }\n\n    init() {\n      this.duplicateSlides();\n      this.calcMovementDistance();\n      this.options.el.classList.add(\"ticker--active\");\n      this.toggleMovement();\n    }\n\n    preLoadImages() {\n      const slides = [...this.options.el.querySelectorAll(\".ticker__slide img\")];\n      slides.map(el => {\n        el.addEventListener(\"load\", e => {\n          this.state.imagesLoaded += 1;\n\n          if (slides.length === this.state.imagesLoaded) {\n            this.state.width = this.getSlidesWidth(slides);\n            this.init();\n          }\n        });\n      });\n    }\n\n    duplicateSlides() {\n      [...this.options.el.querySelectorAll(\".ticker__slide\")].map(el => {\n        this.options.el.querySelector(\".ticker__slides\").innerHTML += el.outerHTML;\n      });\n    }\n\n    getSlidesWidth(slides) {\n      this.options.width = slides.map(el => el.getBoundingClientRect().width).reduce((a, b) => a + b, 0); // this.options.el.querySelector(\".ticker__viewport\").style.maxWidth = this.options.width;\n    } // getDataElements() {\n    // \t[...document.querySelectorAll(\"[data-ticker\")].map((el, id) => ({\n    // \t\tid,\n    // \t\tel,\n    // \t\toptions: e.dataSet.ticker\n    // \t}));\n    // }\n\n\n    calcMovementDistance() {\n      let {\n        speed,\n        fps\n      } = this.options;\n\n      switch (speed) {\n        case \"slow\":\n          speed = 1;\n          break;\n\n        case \"medium\":\n          speed = 3;\n          break;\n\n        case \"fast\":\n          speed = 5;\n          break;\n\n        default:\n          break;\n      }\n\n      this.options.speed = 60 / fps * speed;\n    }\n\n    hoverState() {\n      document.addEventListener(\"mouseover\", e => {\n        let {\n          el: {\n            className: selector\n          }\n        } = this.options;\n\n        if (e.target.matches(`.${selector}`) || !!e.target.closest(`.${selector}`)) {\n          this.updateState(\"active\", false) && this.toggleMovement();\n        } else {\n          this.updateState(\"active\", true) && this.toggleMovement();\n        }\n      });\n    }\n\n    updateState(key, value) {\n      if (this.state[key]) this.state[key] = value;\n    }\n\n    toggleMovement() {\n      const {\n        speed,\n        fps,\n        width\n      } = this.options;\n      let {\n        active\n      } = this.state;\n\n      if (active && speed && this.movement != 1) {\n        this.intervals.movement = setInterval(() => {\n          if (this.state.progress !== parseInt(width)) {\n            this.state.progress += speed;\n          } else {\n            this.state.progress = 0;\n          }\n\n          this.updatePosition();\n        }, parseInt(1000 / fps));\n      } else {\n        clearInterval(this.intervals.movement);\n      }\n    }\n\n    updatePosition() {\n      const {\n        el\n      } = this.options;\n      const {\n        progress\n      } = this.state;\n      el.querySelector(\".ticker__slides\").style.transform = `translate(-${progress}px)`;\n    }\n\n  }\n\n  window.Ticker = ticker;\n})(window);\n\nticking = new Ticker({\n  fps: 60\n});\n\n//# sourceURL=webpack:///./src/ticker.js?");

/***/ }),

/***/ "./src/ticker.scss":
/*!*************************!*\
  !*** ./src/ticker.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/ticker.scss?");

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./src/ticker.scss ./src/ticker.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /Users/callumbridgford-whittick/ticker/src/ticker.scss */\"./src/ticker.scss\");\nmodule.exports = __webpack_require__(/*! /Users/callumbridgford-whittick/ticker/src/ticker.js */\"./src/ticker.js\");\n\n\n//# sourceURL=webpack:///multi_./src/ticker.scss_./src/ticker.js?");

/***/ })

/******/ });