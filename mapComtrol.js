// mapComtrol.js

// Initialize the map
var map = L.map('mapid', {zoomControl:false}).setView([23.795037, 90.448991], 16);

// Add OpenStreetMap tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const customIcon_2D = L.icon(
    {
        
    }
);

let marker = L.marker([23.795037, 90.448991]).addTo(map);
