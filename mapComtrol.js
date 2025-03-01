window.onload = function() {
    // Get the video feed URL from the HTML
    let videoContainer = document.getElementById("videoContainer");
    let videoURL = videoContainer ? videoContainer.getAttribute("data-url") : "";

    // Initialize the map
    var map = L.map('mapid', { zoomControl: false }).setView([23.795037, 90.448991], 16);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Define a custom icon
    const customIcon_2D = L.icon({
        iconUrl: '/icons/dronemovement.gif',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    });

    // Create a marker
    let marker = L.marker([23.795037, 90.448991], { icon: customIcon_2D }).addTo(map)
    .bindPopup('<h3>Live Stream</h3><img id="popupStream" src="" width="200" height="150" alt="Live Stream">', {
        autoClose: false,
        closeOnClick: false,
        maxWidth: 250,  // Maximum width of the popup
        minWidth: 400,  // Minimum width of the popup
        autoPanPadding: [10, 10] // Adjusts how much the map moves when the popup is opened
    });

    marker.on("mouseover", function () {
        marker.openPopup();  // Opens the popup when mouse is over the marker
    });
    
    // Close popup on mouseout
    marker.on("mouseout", function () {
        marker.closePopup();  // Closes the popup when mouse is out
    });


    // Load video stream into popup after it opens
    marker.on("popupopen", function () {
        setTimeout(() => {
            let img = document.getElementById("popupStream");
            if (img) {
                img.src = videoURL + "?t=" + new Date().getTime(); // Add timestamp to prevent caching
            } else {
                console.error("Popup image not found!");
            }
        }, 500); // Small delay to ensure popup renders
    });
};
