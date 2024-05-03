const React = require('react');
const { createContext, useContext, useState, useEffect } = require('react');

const WebSocketDataContext = createContext();

function useWebSocketData() {
  return useContext(WebSocketDataContext);
}

const WebSocketDataProvider = ({ children }) => {
  const [webSocketData, setWebSocketData] = useState(null);

  useEffect(() => {
    const receiveData = (ip, port) => {
      const socket = new WebSocket(`ws://${ip}:${port}`);

      socket.onopen = function() {
          console.log("Connected");
          const send_data = 'listener';
          socket.send(send_data);
      };

      socket.onmessage = function(event) {
          try {
              const data_json = JSON.parse(event.data);
              console.log(`latitude: ${data_json['latitude']}`);
              console.log(`longitude: ${data_json['longitude']}`);
              console.log(`altitude: ${data_json['altitude']}`);
              console.log(`yaw: ${data_json['yaw']}`);
              console.log(`pitch: ${data_json['pitch']}`);
              console.log(`roll: ${data_json['roll']}`);
              setWebSocketData(data_json); // WebSocket 데이터 업데이트
          } catch (error) {
              console.error(error);
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

    const ip = '203.255.57.136';
    const port = 5252;
    receiveData(ip, port);
  }, []); // useEffect는 한 번만 실행되어야 함

  return (
    React.createElement(WebSocketDataContext.Provider, { value: { webSocketData } }, children)
  );
};

module.exports = { WebSocketDataContext, useWebSocketData, WebSocketDataProvider };
