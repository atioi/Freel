mapboxgl.accessToken = 'pk.eyJ1IjoibHVrYXMxMjMxMjMxMjMiLCJhIjoiY2t5YmI1OHFhMDZ6eTJwbXRpN2ttczhxbyJ9.HZVUTHp95APJHyzIEWQkJA';


class Mapbox {

    coords = null;
    #map;
    #marker;
    #decoder;
    #geolocator;

    constructor() {


        /*
        *   The Map object represents the map on your page.
        *   It exposes methods and properties that enable you to programmatically change the map,
        *   and fires events as users interact with it.
        *
        *   You create a Map by specifying a container and other options.
        *   Then Mapbox GL JS initializes the map on the page and returns your Map object.
        *
        *   https://docs.mapbox.com/mapbox-gl-js/api/map/
        *
        * */
        this.#map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [9, 53],
            zoom: 2
        });

        // Marker:
        this.#marker = new mapboxgl.Marker({
            // Allows user to move the marker.
            draggable: true
        });

        // Geolocator:

        /*  A GeolocateControl control provides a button that uses the browser's geolocation API to locate the user on the map.
        *   https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol
        *
        *   example: https://docs.mapbox.com/mapbox-gl-js/example/locate-user/
        *
        * */
        this.#geolocator = new mapboxgl.GeolocateControl({
            fitBoundsOptions: {
                maxZoom: 20
            },
            positionOptions: {
                enableHighAccuracy: true
            },
            // Prevents the geolocator to display its own mark and accuracy circle because a new marker is going to be added.
            trackUserLocation: false,
            showUserHeading: false,
            showUserLocation: false
        });

        this.#decoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            // Search box will not
            marker: false
        });

        // Add components:
        this.#map.addControl(this.#decoder);
        this.#map.addControl(this.#geolocator);

        this.#geolocator.on('geolocate', (position) => this.geolocate(position));
        this.#marker.on('dragend', (position) => this.drag(position));
        this.#decoder.on('result', (result) => this.decode(result));

    }

    decode(result) {
        this.coords = result.result.geometry.coordinates;
        this.#marker.setLngLat(this.coords).addTo(this.#map);
    }

    drag(position) {
        this.coords = [this.#marker.getLngLat().lng, this.#marker.getLngLat().lat]
    }

    geolocate(position) {
        console.log(position);
        this.coords = [position.coords.longitude, position.coords.latitude];
        this.#marker.setLngLat(this.coords).addTo(this.#map);
    }


}

