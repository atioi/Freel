mapboxgl.accessToken = 'pk.eyJ1IjoibHVrYXMxMjMxMjMxMjMiLCJhIjoiY2t5YmI1OHFhMDZ6eTJwbXRpN2ttczhxbyJ9.HZVUTHp95APJHyzIEWQkJA';


class Mapbox {

    coords = null;
    #map;
    #marker;
    #decoder;
    #geolocator;

    constructor() {

        this.map_wrapper = this.renderMapWrapper();

        this.run();
    }

    render() {
        return this.map_wrapper;
    }



    run() {
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
        this.suppressError();
        this.coords = result.result.geometry.coordinates;
        this.#marker.setLngLat(this.coords).addTo(this.#map);
    }

    drag(position) {
        this.suppressError();
        this.coords = [this.#marker.getLngLat().lng, this.#marker.getLngLat().lat]
    }

    geolocate(position) {
        this.suppressError();
        this.coords = [position.coords.longitude, position.coords.latitude];
        this.#marker.setLngLat(this.coords).addTo(this.#map);
    }

    // The code below is rock-solid:

    // Map:

    renderMapWrapper() {
        const div = document.createElement('div');
        div.className = 'Map-Container';

        const map = document.createElement('div');
        map.id = 'map';

        div.append(map);
        div.append(this.renderErrorMessageContainer());

        document.body.append(div);

        return div;
    }

    //  Error communicator :

    renderErrorMessageContainer() {
        const div = document.createElement('div');
        div.className = 'Map-Error-Container';

        const p = document.createElement('p');
        p.id = 'map-error-paragraph';
        p.innerText = 'error';

        const error_outline = document.createElement('i');
        error_outline.id = 'error_outline';
        error_outline.innerText = 'error_outline';
        error_outline.className = 'material-icons';

        div.append(p);
        div.append(error_outline);

        return div;
    }

    showError(error) {
        const p = document.getElementById('map-error-paragraph');
        p.innerText = error;
        p.parentElement.style.visibility = 'visible';
    }

    suppressError() {
        const p = document.getElementById('map-error-paragraph');
        p.parentElement.style.visibility = 'hidden';
    }

    getPosition() {
        return this.coords;
    }

}