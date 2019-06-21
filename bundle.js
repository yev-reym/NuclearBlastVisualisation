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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/nuclear.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/nuclear.js":
/*!************************!*\
  !*** ./src/nuclear.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {



document.addEventListener('DOMContentLoaded', () => {

    function getPosition(){
        return new Promise((resolve, reject) => {
            function success(position) {
                    // for when getting location is a success
                    const coordinates = {
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    }
                    resolve(coordinates);
            }

            function error(error_message) {
                        // for when getting location results in an error
                        reject(console.error('An error has occured while retrieving location', error_message));
            }  

            if ("geolocation" in navigator) {
                // check if geolocation is supported/enabled on current browser
                const mapOptions = {
                    enableHighAccuracy: true
                }
                navigator.geolocation.getCurrentPosition(
                        success,
                        error,
                        mapOptions
                );

            } else {
            // geolocation is not supported
            // get your location some other way
                alert('geolocation is not enabled on this browser')
            }

        });
    }
    window.getPosition = getPosition;

    getPosition().then((coords) => {

            const latitude = coords.lat;
            const longitude = coords.long;
             //Place a script tag at the header containing our map initialization function
            const head = document.getElementsByTagName('head')[0];
            const scriptMap = document.createElement('script');
            scriptMap.type = 'text/javascript';
            scriptMap.id = 'scriptMap';
            scriptMap.setAttribute('data-lat', `${latitude}`);
            scriptMap.setAttribute('data-long', `${longitude}`)
            head.appendChild(scriptMap);

            function initMap() {
                const lat = document.getElementById('scriptMap').getAttribute('data-lat');
                const long = document.getElementById('scriptMap').getAttribute('data-long');

                var currentLocation = { lat: parseFloat(lat) , lng: parseFloat(long) };
                debugger
                var map = new google.maps.Map(
                    document.getElementById('map'),
                    { zoom: 11, 
                    center: currentLocation,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    mapTypeIds: ['roadmap', 'terrain']
                    } });
                var marker = new google.maps.Marker({ position: currentLocation, map: map });
            }
            
            scriptMap.innerHTML = initMap;
         

            const body = document.getElementsByTagName('body')[0];
            const scriptAPI = document.createElement('script');
            scriptAPI.type = 'text/javascript';
            scriptAPI.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD0RuIHcxsFDgZPuy2B3Kg_y7XqXaIfNEY&callback=initMap";
            body.appendChild(scriptAPI);
    })
           
        

    //Make an api request to google maps to get the map access and pass the initMap callback inside of the api request body


    // https://nuclearsecrecy.com/nukemap/
    // http://nuclearweaponarchive.org/Nwfaq/Nfaq5.html#nfaq5.1
    // https://hackernoon.com/d3-js-and-google-maps-api-in-10-easy-steps-4f258323525b
    // https://console.cloud.google.com/google/maps-apis/api-list?project=detonationmap
    // https://developers.google.com/maps/documentation/javascript/tutorial
    // https://developers.google.com/maps/documentation/javascript/examples/layer-data-polygon


})

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map