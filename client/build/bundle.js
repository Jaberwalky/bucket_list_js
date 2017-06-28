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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(1);

var app = function(){
  new UI();
}

window.addEventListener('load', app);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Places = __webpack_require__(2);

var UI = function(){
  var places = new Places();
  places.all(function(allPlaces){
    this.render(allPlaces)
  }.bind(this));
  this.attachFormOnSubmit();
}

UI.prototype = {

  attachFormOnSubmit: function(){
    var form = document.getElementById('new-place-form');
    form.addEventListener("submit", function(event){
      event.preventDefault();
      var name = form['name-field'].value;
      var duration = form['duration-field'].value;

      var placeToAdd = {
        name: name,
        duration: duration
      }

      var places = new Places();
      places.add(placeToAdd, function(newData){
        console.log('response in ui', newData)
      });
    });
  },
  render: function(allPlaces){
    var ul = document.getElementById("places-list");
    allPlaces.forEach(function(place){
      var listItem = document.createElement("li")
      listItem.innerText = place.name + "  :  " + place.duration
      ul.appendChild(listItem);
    })
  }






}

module.exports = UI;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Places = function(){

}

Places.prototype = {
  all: function(onPlacesReady){
    this.makeRequest('http://localhost:3000/api/places', function(allPlaces){
      onPlacesReady(allPlaces)
    })
  },
  makeRequest: function(url, onRequestComplete){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function(){
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsData = JSON.parse(jsonString);
      onRequestComplete(resultsData);
    });
    request.send();
  },

  add: function(newPlace, callback){
    var jsonString = JSON.stringify(newPlace);
    this.makePostRequest('http://localhost:3000/api/places', callback, jsonString);
  },

  makePostRequest: function(url, onRequestComplete, payload){
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function(){
      var jsonString = request.responseText;
      var updatedPlaces = JSON.parse(jsonString);
      onRequestComplete(updatedPlaces);
    })
    request.send(payload);
  }


}

module.exports = Places;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map