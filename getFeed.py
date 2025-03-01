from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
import cv2
import os

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

VIDEO_URL = 'https://developmental-julia-plain-german.trycloudflare.com/video_feed'

# Serve static files (for the map script, gif, and CSS)
app.mount("/static", StaticFiles(directory=BASE_DIR), name="static")

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)


def generate_frames():
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
  # or your video source
    
    while True:
        success, frame = cap.read()
        
        if not success:
            break
        else:
            _, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# Serve your custom HTML file
@app.get("/")
def serve_html():
    return StreamingResponse(open(os.path.join(BASE_DIR, "index.html"), "r"), media_type="text/html")

@app.get("/video")
def video_feed():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")

# Custom routes for serving JavaScript and other static files
@app.get("/mapComtrol.js")
def serve_map_script():
    return StreamingResponse(open(os.path.join(BASE_DIR, "mapComtrol.js"), "r"), media_type="application/javascript")

@app.get("/icons/dronemovement.gif")
def serve_gif():
    return StreamingResponse(open(os.path.join(BASE_DIR, "icons/dronemovement.gif"), "rb"), media_type="image/gif")

@app.get("/style.css")
def serve_styles():
    return StreamingResponse(open(os.path.join(BASE_DIR, "style.css"), "r"), media_type="text/css")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
