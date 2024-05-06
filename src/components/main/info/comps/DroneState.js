import React from 'react';
import { useWebSocketData } from '../../../../WebSocketDataContext';
import './DroneState.css';

const DroneState = () => {
    const { webSocketData } = useWebSocketData(); // Access WebSocket data directly

    return (
        <div className='DroneStateContainer'>
            <h2>Drone State</h2>
            {webSocketData ? (
                <div>
                    {/* <p>altitude: {webSocketData.altitude}</p>
                    <p>latitude: {webSocketData.latitude}</p>
                    <p>longitude: {webSocketData.longitude}</p>
                    <p>roll: {webSocketData.roll}</p>
                    <p>yaw: {webSocketData.yaw}</p>
                    <p>pitch: {webSocketData.pitch}</p> */}
                </div>
            ) : (
                <p>Loading drone state...</p>
            )}
        </div>
    );
};

export default DroneState;
