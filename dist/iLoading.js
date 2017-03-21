(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ILoading"] = factory();
	else
		root["ILoading"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ILoading = function () {
    //传入包裹图片的父元素
    function ILoading(wrapper) {
        _classCallCheck(this, ILoading);

        this.wrapper = null;

        if (typeof wrapper === "string") {
            this.wrapper = document.querySelector(wrapper);
        } else if ((typeof wrapper === "undefined" ? "undefined" : _typeof(wrapper)) === "object" && wrapper.innerHTML) {
            this.wrapper = wrapper;
        }

        if (this.wrapper) {
            this.allImgs = this.wrapper.getElementsByTagName("img") || null;
        }
    }

    /*用户获得加载进度，通过传入回调函数的形式获得当前加载的数量
        new ILoading(dom).loadingProcess((count,sum)=>{  //count: how many images has loaded , sum: the sum of the image need load.    })
    */


    _createClass(ILoading, [{
        key: "loadingProcess",
        value: function loadingProcess(cb) {
            var sum = this.allImgs.length;
            var self = this;
            var count = 0;
            if (!this.allImgs || sum === 0) {
                console.error("ImgLoading don not get imgs!");
            }

            for (var i = 0; i < sum; i++) {
                var imgObj = new Image();
                imgObj.onload = function () {
                    count++;
                    cb && cb(count, sum);
                };

                imgObj.onerror = function () {
                    console.error("img load error");
                };
                imgObj.src = this.allImgs[i].src;
            }
        }
        /*有时图片加载的太快，我们看不到弱网状态下的loading页效果，这时就需要用这个函数了，可以设置每隔多久请求一张图片。
            new ILoading(dom).loadingProcessMock((count,sum)=>{  //count: how many images has loaded , sum: the sum of the image need load.    },time count by milliosection)
        */

    }, {
        key: "loadingProcessMock",
        value: function loadingProcessMock(cb) {
            var mil = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

            var sum = this.allImgs.length;
            var self = this;
            var count = 0;
            var index = 0;
            var interval = mil;

            if (typeof cb !== "function") {
                console.error("the first param must function");
            }
            if (!this.allImgs || sum === 0) {
                console.error("ImgLoading don not get imgs!");
            }

            var startTime = +new Date();

            loop();
            function loading(i) {
                var imgObj = new Image();
                imgObj.onload = function () {
                    count++;
                    cb && cb(count, sum);
                };

                imgObj.onerror = function () {
                    console.error("img load error");
                };
                imgObj.src = self.allImgs[i].src;
            }
            function loop() {
                if (sum === index) return;
                var now = +new Date();
                if (now - startTime > interval) {
                    startTime = now;
                    loading(index);
                    index++;
                }
                requestAnimationFrame(loop);
            }
        }
    }]);

    return ILoading;
}();

/*静态函数，用于异步加载单张图片
    param src  String  img src
    param cb   Function callback 
*/


ILoading.loadImg = function (src, cb) {
    if (!src || "string" !== typeof src) {
        return console.error("loadImg first param necessary and neet be string");
    }

    var imgObj = new Image();
    imgObj.onload = function () {
        cb && cb(null, imgObj);
    };
    imgObj.onerror = function (err) {
        cb && cb(err);
        console.error("img src '" + src + "' load error");
    };
    imgObj.src = src;
};
module.exports = ILoading;

/***/ })
/******/ ]);
});
//# sourceMappingURL=iLoading.js.map