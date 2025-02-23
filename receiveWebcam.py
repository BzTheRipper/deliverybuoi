import cv2
import numpy as np
import websockets
import asyncio
import base64

async def receive_frames():
    async with websockets.serve(handle_frame, "localhost", 8000):
        await asyncio.Future()  # Keep running

async def handle_frame(websocket):
    async for message in websocket:
        image_data = message.split(",")[1]  # Remove data URL prefix
        image_bytes = base64.b64decode(image_data)

        # Convert to OpenCV format
        np_arr = np.frombuffer(image_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if frame is not None:
            cv2.imshow("Webcam Feed", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

# Start the WebSocket server
asyncio.run(receive_frames())

cv2.destroyAllWindows()
