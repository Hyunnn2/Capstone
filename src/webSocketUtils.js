import { useWebSocketData } from './WebSocketDataContext';

const receiveDataFromWebSocket = (data) => {
  const { updateWebSocketData } = useWebSocketData();
  updateWebSocketData(data);
};
