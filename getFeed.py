from fastapi import FastAPI, Form
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import cv2
import os
from pathlib import Path

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

VIDEO_URL = 'https://developmental-julia-plain-german.trycloudflare.com/video_feed'

TEMPLATES = os.path.join(BASE_DIR, 'templates')
TEMPFILES = Path(TEMPLATES)

for file in TEMPFILES.rglob("*"):
    if file.is_file():
        print("........Checking all the files in templates......:",file.name)

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

def getFile(fileNames):
    return fileNames[0]

getFileName = ["index.html"]

@app.post("/dummy")
async def receive_text(text: str = Form(...)):
    # Print the received text to the console
    print(f".................Received text: {text}")
    global getFileName
    getFileName = [text]
    
    # Respond back with a confirmation message
# Serve your custom HTML file
@app.get("/")
def serve_html():
    fileNames = []
    for file in TEMPFILES.rglob("*"):
        if file.is_file():
            print("........Checking all the files in templates......:",file.name)
            fileNames.append(file.name)
            
    return StreamingResponse(open(os.path.join(TEMPLATES, getFileName[0]), "r"), media_type="text/html")

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
