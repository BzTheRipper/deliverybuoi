import * as L from "leaflet";

const map = L.map("maps").setView([23.799031, 90.449508], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
    maxZoom: 19,
    attribution: '&copy; <a href=https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);