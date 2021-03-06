import SidePanel from './sidepanel';

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
                };
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

    //  const sidePanel = new SidePanel();
    //  sidePanel.initPanel();

    getPosition().then((coords) => {

            const latitude = coords.lat;
            const longitude = coords.long;
             //Place a script tag at the header containing our map initialization function
            const head = document.getElementsByTagName('head')[0];
            const scriptMap = document.createElement('script');
            scriptMap.type = 'text/javascript';
            scriptMap.id = 'scriptMap';
            scriptMap.setAttribute('data-lat', `${latitude}`);
            scriptMap.setAttribute('data-long', `${longitude}`);
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


               

                const drawCircle = (radius, strokeColor, fillColor) => {
                    let lat = marker.getCurrentPosition().lat();
                    let lng = marker.getCurrentPosition().long();
                    center = {lat, lng};

                    new google.maps.Circle({
                        strokeColor,
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: fillColor,
                        fillOpacity: 0.35,
                        map,
                        center,
                        radius
                    });
                };

                const sidePanel = new SidePanel();
                sidePanel.initPanel();

                debugger

                const handleDetonation = () => {
                    const radii = sidePanel.getRadii();
                    for (let radius in radii) {
                        switch(radius){
                            case fireballRad:
                                return drawCircle(radii.fireballRad, 'red', 'orange');
                            case onsetNuclearRadiation500Rem:
                                return drawCircle(radii.onsetNuclearRadiation500Rem, 'yellow', 'green');
                            case thermalRadiation3rdDegreeBurns:
                                return drawCircle(radii.thermalRadiation3rdDegreeBurns, '#f50', 'yellow');
                            case craterRadius:
                                return drawCircle(radii.craterRadius, 'black', '#ccc');
                        }
                    }

                };

                const detonateButton = document.getElementById('detonate');
                google.maps.event.addDomListener(detonateButton, 'click', handleDetonation
                );
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

    
 


    // https://nuclearsecrecy.com/nukemap/
    // http://nuclearweaponarchive.org/Nwfaq/Nfaq5.html#nfaq5.1
    // https://hackernoon.com/d3-js-and-google-maps-api-in-10-easy-steps-4f258323525b
    // https://console.cloud.google.com/google/maps-apis/api-list?project=detonationmap
    // https://developers.google.com/maps/documentation/javascript/tutorial
    // https://developers.google.com/maps/documentation/javascript/examples/layer-data-polygon

  
    

});

// https://www.fourmilab.ch/etexts/www/effects/eonw_3.pdf#zoom=100
           
        

   
//   //test
//     window.getInfo = function (){
//         return fetch('https://cors-anywhere.herokuapp.com/https://www.osti.gov/api/v1/records/4706703', {
//             method: 'GET', // *GET, POST, PUT, DELETE, etc.
//             // mode: 'cors', // no-cors, cors, *same-origin
//             // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//             credentials: 'omit', // include, *same-origin, omit
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             // redirect: 'follow', // manual, *follow, error
//             // referrer: 'no-referrer', // no-referrer, *client
//             // body: JSON.stringify(data), // body data type must match "Content-Type" header
//         })//.then( response => console.log( response.json() ) ); // parses JSON response into native Javascript objects 
//     };


