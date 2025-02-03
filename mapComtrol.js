// mapComtrol.js

// Initialize the map
var map = L.map('mapid', {zoomControl:false}).setView([23.798788, 90.449459], 16);

// Add OpenStreetMap tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const customIcon_2D = L.icon(
    {
        
    }
);

let marker = L.marker([23.798871, 90.449504]).addTo(map);
