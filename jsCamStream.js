const webcamVideo = document.getElementById("webcamVideo");

x = navigator.mediaDevices.getUserMedia({video: true}).then((stream)=>{
    webcamVideo.srcObject = stream;

}).catch((error)=>{
    console.error(error);
})
