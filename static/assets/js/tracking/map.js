/**
 * JNS Express Delivery - Google Maps Tracking Visualization
 */

export class TrackingMap {
    constructor(containerId) {
        this.containerId = containerId;
        this.map = null;
        this.marker = null;
        this.isLoaded = false;
    }

    async init() {
        if (this.isLoaded) return;

        // Check if Google Maps is loaded
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
            console.error('Google Maps API not loaded. Please ensure the API key is correct.');
            return;
        }

        const center = { lat: 20, lng: 0 }; // Default global view
        
        this.map = new google.maps.Map(document.getElementById(this.containerId), {
            zoom: 2,
            center: center,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#ffffff" }]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{ "visibility": "on" }, { "color": "#3e606f" }, { "weight": 2 }, { "gamma": 0.8 }]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [{ "visibility": "off" }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{ "weight": 0.6 }, { "color": "#1a3541" }]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#0b2027" }]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#0b2027" }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#1a3541" }, { "lightness": -20 }]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#1a3541" }]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#0b2027" }]
                }
            ],
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true
        });

        this.isLoaded = true;
    }

    updateLocation(lat, lng) {
        if (!this.map) return;

        const pos = { lat: parseFloat(lat), lng: parseFloat(lng) };

        // Create or move marker
        if (this.marker) {
            this.marker.setPosition(pos);
        } else {
            this.marker = new google.maps.Marker({
                position: pos,
                map: this.map,
                icon: {
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    scale: 5,
                    fillColor: "#FF8C00",
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "#FFFFFF",
                },
                animation: google.maps.Animation.DROP,
                title: "Package Location"
            });
        }

        // Smoothly pan to the new location
        this.map.panTo(pos);
        this.map.setZoom(8);
    }
}
