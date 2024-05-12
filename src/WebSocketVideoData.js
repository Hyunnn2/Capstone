import { useDispatch } from 'react-redux';
import { setVideoData } from './redux/reducer/reducer';

const WebSocketVideoData = (serverAddress, serverPort, onDataReceived) => {
  const socket = new WebSocket(`ws://${serverAddress}:${serverPort}`);

  socket.onopen = function() {
    console.log("비디오 Connected");
    const send_data = 'listener';
    socket.send(send_data);
  };

  socket.onmessage = function(event) {
    try {
      console.log(event)
      const data = event.data; // 비디오 데이터
      onDataReceived(data); // 비디오 데이터를 받은 후 콜백 함수 호출
      console.log(data);
    } catch (error) {
      console.error("Error processing frame:", error);
    }
  };

  socket.onerror = function(error) {
    console.error(error);
  };

  socket.onclose = function() {
    console.log("Connection closed");
    socket.close(); // 소켓 종료
  };
};

export default WebSocketVideoData;



