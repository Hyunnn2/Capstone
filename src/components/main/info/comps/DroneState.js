import React from 'react';
import { useWebSocketData } from '../../../../WebSocketDataContext';
import './DroneState.css';

const DroneState = () => {
    const { webSocketData } = useWebSocketData(); // Access WebSocket data directly

    return (
        <div className='DroneStateContainer'>
            <h2>Drone State</h2>
            {webSocketData ? (
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    <p>Altitude : {webSocketData.altitude}</p>
                    <p>Longitude : {webSocketData.longitude}</p>
                    <p>Latitude : {webSocketData.latitude}</p>
                    <br />
                    <p>Roll : {webSocketData.roll}</p>
                    <p>Yaw  : {webSocketData.yaw}</p>
                    <p>Pitch : {webSocketData.pitch}</p>
                </div>
            ) : (
                <p>Loading drone state...</p>
            )}
        </div>
    );
};

export default DroneState;
