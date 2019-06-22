// import * as constants from '../keys';
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

    var side = new SidePanel();
    side.initYield();

    // https://nuclearsecrecy.com/nukemap/
    // http://nuclearweaponarchive.org/Nwfaq/Nfaq5.html#nfaq5.1
    // https://hackernoon.com/d3-js-and-google-maps-api-in-10-easy-steps-4f258323525b
    // https://console.cloud.google.com/google/maps-apis/api-list?project=detonationmap
    // https://developers.google.com/maps/documentation/javascript/tutorial
    // https://developers.google.com/maps/documentation/javascript/examples/layer-data-polygon


});
           
        

   


