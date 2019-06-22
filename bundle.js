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

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: bombData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bombData", function() { return bombData; });

//Store nuclear bomb / warhead data to be displayed in selector, in addition to a custom yield input

const bombData = {

    //usa first

    'Davy Crockett': {
        yield: '0.02 kt [TNT]',
        origin: 'U.S.A',
        date: '7-July-1962' ,
        dropLocation: 'Nevada Test Site, Nevada' ,
        description: "The M-28 or M-29 Davy Crockett Weapon System was the tactical nuclear recoilless gun\
        for firing the M-388 nuclear projectile that was deployed by the United States during the Cold War.\
        It was one of the smallest nuclear weapon systems ever built, and was developed for use against Soviet\
        and North Korean armor and troops in case war broke out in Europe or the Korean peninsula. The M-388 round\
        used a version of the Mk-54 warhead, a very small sub-kiloton fission device. Tested under the code-name\
        Little-Feller nuclear test."

    },
    
    'Little Boy': {
        yield: '15 kt [TNT]',
        origin: 'U.S.A',
        date: '6-August-1945' ,
        dropLocation: 'Hiroshima, Japan',
        description: "First atomic bomb dropped on the Japanese city of Hiroshima during World War II.\
        It was the first nuclear weapon used in warfare. The Hiroshima bombing was the second man-made\
        nuclear explosion in history, after the Trinity test, and the first uranium-based detonation.\
        Its components were fabricated at three different plants so that no one would have a copy of the\
        complete design. After the war ended, it was not expected that the inefficient Little Boy design\
        would ever again be required, and many plans and diagrams were destroyed."
    },
    'Fat Man': {
        yield: '15 kt [TNT]',
        origin: 'U.S.A',
        date: '9-August-1945',
        dropLocation: 'Nagasaki, Japan',
        description: "Implosion type plutonium-239 fission bomb (the second of the two nuclear weapons used in warfare).\
        The name Fat Man refers to the early design of the bomb because it had a wide, round shape; it was also known as\
        the Mark III. The first of that type to be detonated was the Gadget in the Trinity nuclear test less than a month earlier.\
        The Fat Man was retired in 1950."
    },
    // 'W-76': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-80': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-87': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'B-61 Mod 7': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-87': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-88': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'Ivy-King': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-59': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'B-83': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-39': {
    //     yield: ,
    //     origin: 'U.S.A',
    //     date:   ,
    //     dropLocation: ,
    //     description:

    // },
    // 'W-53': {
    //     yield: ,
    //     origin: 'U.S.A'Ivy-Mike
    //     date:   ,
    //     dropLocation: ,Ivy-Mike
    //     description:

    // },
    'Ivy-Mike': {
        yield: '104000.0 kt [TNT]' ,
        origin: 'U.S.A',
        date: '1-November-1952'  ,
        dropLocation: 'Enewetak Atoll, Marshall Islands',
        description: " Designed by Richard Garwin, a student of Enrico Fermi, Ivy Mike\
        was the first test of a thermonuclear device, in which part of the explosive yield\
        comes from nuclear fusion, also known as a hydrogen bomb. It was detonated as part of Operation Ivy.\
        It was the first full test of the Teller–Ulam design, a staged fusion device.Due to its physical size\
        and fusion fuel type(cryogenic liquid deuterium), the Mike device was not suitable for use as a deliverable weapon.\
        In fact, the 82-ton device was essentially a building that resembled a factory rather than a weapon.\
        At its center, a very large cylindrical thermos flask or cryostat held the cryogenic deuterium fusion fuel.\
        A regular fission bomb at one end was used to create the conditions needed to initiate the fusion reaction."
    },
    'Castle-Bravo': {
        yield: '15000.0 kt [TNT]',
        origin: 'U.S.A',
        date:  '1-March-1954' ,
        dropLocation: 'Bikini Atoll, Marshall Islands' ,
        description: 
        "The first test of a deployable (solid fuel) thermonuclear weapon.\
        Also (accidentally) the largest weapon ever tested by \
        the United States (15 megatons). It was also the single largest U.S. radiological\
        accident in connection with nuclear testing. \
        The unanticipated yield,\
        and a change in the weather, resulted in nuclear fallout spreading eastward onto\
        the inhabited Rongelap and Rongerik atolls, which were soon evacuated.\
        Many of the Marshall Islands natives have since suffered from birth defects and have received\
        some compensation from the federal government of the United States. A Japanese fishing boat,\
        the Daigo Fukuryū Maru, also came into contact with the fallout, which caused many of the crew to grow ill;\
        one eventually died."

    },
    'Gadget': {
        yield: '22.1 kt [TNT]',
        origin: 'U.S.A',
        date: '16-July-1945',
        dropLocation: 'Soccoro, New Mexico',
        description: "The first detonation of a nuclear weapon in the Trinity test, as part of the Manhattan Project.\
        Bomb was an implosion-design plutonium device, of the same design as the Fat Man bomb later detonated over Nagasaki.\
        The complexity of the design required a major effort from the Los Alamos Laboratory, and concerns about whether it would\
        work led to a decision to conduct the first nuclear test."

    },
};

//More bomb data to implement possibly later when I have time.
// 'B61 Mod 3': {                       
//         yield: ,
//         origin: 'U.S.A' ,
//         date:  ,
//         dropLocation: ,
//         description: ""

//     },


/***/ }),

/***/ "./src/nuclear.js":
/*!************************!*\
  !*** ./src/nuclear.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sidepanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidepanel */ "./src/sidepanel.js");
// import * as constants from '../keys';


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
                // debugger
                var map = new google.maps.Map(
                    document.getElementById('map'),
                    { zoom: 11, 
                    center: currentLocation,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    mapTypeIds: ['roadmap', 'terrain', 'satellite']
                    } });
                var marker = new google.maps.Marker({
                    position: currentLocation,
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP
                });
            }
            
            scriptMap.innerHTML = initMap;

        //Make an api request to google maps to get the map access and pass the initMap callback inside of the api request body
            // debugger
            const body = document.getElementsByTagName('body')[0];
            const scriptAPI = document.createElement('script');
            scriptAPI.type = 'text/javascript';
        scriptAPI.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD0RuIHcxsFDgZPuy2B3Kg_y7XqXaIfNEY&callback=initMap';
            body.appendChild(scriptAPI);

   
    });

    var side = new _sidepanel__WEBPACK_IMPORTED_MODULE_0__["default"]();
    side.initYield();

    // https://nuclearsecrecy.com/nukemap/
    // http://nuclearweaponarchive.org/Nwfaq/Nfaq5.html#nfaq5.1
    // https://hackernoon.com/d3-js-and-google-maps-api-in-10-easy-steps-4f258323525b
    // https://console.cloud.google.com/google/maps-apis/api-list?project=detonationmap
    // https://developers.google.com/maps/documentation/javascript/tutorial
    // https://developers.google.com/maps/documentation/javascript/examples/layer-data-polygon


});
           
        

   




/***/ }),

/***/ "./src/sidepanel.js":
/*!**************************!*\
  !*** ./src/sidepanel.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");
 


class SidePanel {
    constructor(){
        this.initYield = this.initYield.bind(this);
        this.whenSelected = this.whenSelected.bind(this);
    }

    initPanel(){
        this.initYield();
    }

    whenSelected(e){
        debugger
        e.preventDefault();
        const bombInfo = document.getElementById('bombInfo');

        while (bombInfo.firstChild){
            bombInfo.removeChild(bombInfo.firstChild);
        }

        const bombName = e.target.value;
        const bombObject = _data__WEBPACK_IMPORTED_MODULE_0__["bombData"][bombName];

        Object.keys(bombObject).forEach(attr => {
            let newListItem = document.createElement('li');
            newListItem.append(bombObject[attr]);
            bombInfo.appendChild(newListItem);
        });
        
    }

    initYield(){
        const yieldSelect = document.getElementById('yieldSelect');
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Or choose one that has been tested already.';
        defaultOption.selected = true;
        defaultOption.disabled = true;
        defaultOption.value = null;
        yieldSelect.appendChild(defaultOption);
        const bombs = Object.keys(_data__WEBPACK_IMPORTED_MODULE_0__["bombData"]);
        bombs.forEach(bomb => {
            let newOption = document.createElement('option');
            const bombObject = _data__WEBPACK_IMPORTED_MODULE_0__["bombData"][bomb]
            newOption.text = bombObject.origin + ' \u21D2 ' + bomb + ' \u21D2 ' + bombObject.yield + ' \u21D2 ' + bombObject.date;
            newOption.value = bomb;
            yieldSelect.appendChild(newOption);
        });
        yieldSelect.addEventListener('change', this.whenSelected );
    }

}

/* harmony default export */ __webpack_exports__["default"] = (SidePanel);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map