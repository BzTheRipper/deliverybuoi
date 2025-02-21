from flask import Flask, render_template,Response,send_from_directory
import cv2
from time import sleep
#import pyscript
import mainPython
import os

app = Flask(__name__, template_folder='.')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

#cap = cv2.VideoCapture("http://127.0.0.1:5123/")

def generate_frames():
    cap = cv2.VideoCapture()  # or your video source

    while True:
        cap = cv2.VideoCapture()
        success, frame = cap.read()
        if not success:
            break
        else:
            _, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            
def get_frame():
    cap = cv2.VideoCapture("http://127.0.0.1:5123/")
            

@app.route('/mapComtrol.js')
def serve_map_script():
    return send_from_directory(BASE_DIR, 'mapComtrol.js')

# Route to serve the CSS file
@app.route('/style.css')
def serve_styles():
    return send_from_directory(BASE_DIR, 'style.css')    
    

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video')
def video():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 4000))
    app.run(host="0.0.0.0", port = port)