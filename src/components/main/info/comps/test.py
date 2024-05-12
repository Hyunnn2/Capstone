import cv2
import pickle
import queue
import websockets
import asyncio
import predict


async def receive_data(websocket, Predict):
    print('streamer connected')
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter('output.mp4', fourcc, 10, (640, 320))

    while True:
        try:
            frame_size_bytes = await websocket.recv()
            frame_size = int.from_bytes(frame_size_bytes, byteorder='big')
            if frame_size == 0:
                continue
            frame_data = b''
            while len(frame_data) < frame_size:
                packet = await websocket.recv()
                if not packet:
                    break
                frame_data += packet
            frame = pickle.loads(frame_data)
            frame = cv2.imdecode(frame, cv2.IMREAD_COLOR)
            frame = Predict.pred(frame)
            frame = cv2.resize(frame, (0, 0), fx=0.5, fy=0.5, interpolation=cv2.INTER_LINEAR)
            writer.write(frame)
            
        except websockets.exceptions.ConnectionClosedError:
            print("streamer disconnected")
            break

    writer.release()

async def main(websocket):
    Predict=predict.yolo()
    part = await websocket.recv()
    if part == 'streamer':
        await receive_data(websocket, Predict)
    else:
        print("Unknown client type:", part)

if __name__ == "__main__":
    start_server = websockets.serve(main, '203.255.57.136', 5253)

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
