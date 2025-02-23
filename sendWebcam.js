const video = document.createElement("video");
video.autoplay = true;

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;

        const socket = new WebSocket("ws://localhost:8000");

        socket.onopen = () => {
            console.log("WebSocket connected!");

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            setInterval(() => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = canvas.toDataURL("image/jpeg");
                socket.send(imageData);
            }, 50);  // Send frame every 50ms (20 FPS)
        };

        socket.onclose = () => console.log("WebSocket closed!");
    })
    .catch(err => console.error("Error accessing webcam:", err));
