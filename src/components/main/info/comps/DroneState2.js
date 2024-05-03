//파이어스토어에서 위도, 경도, 고도 값 받아오기
import React, { useEffect, useState } from 'react';
import { receiveData } from '../../../../receiveData_server'
import './DroneState.css';


const DroneState = () => {
    const [droneState, setDroneState] = useState(null);

    useEffect(() => {
        const getDroneState = async () => {
            try {
                const state = await receiveData('203.255.57.136', 5252); // Firestore에서 드론 상태 가져오기
                setDroneState(state); // 상태 설정
            } catch (error) {
                console.error('Error fetching drone state:', error);
            }
        };

        getDroneState(); // 드론 상태 가져오기 함수 호출
    }, []);

    return (
        <div className='DroneStateContainer'>
            <h2>Drone State</h2>
            {droneState ? (
                <div>
                    <p>altitude: {droneState.altitude}</p>
                    <p>latitude: {droneState.latitude}</p>
                    <p>longitude: {droneState.longitude}</p>
                    <p>roll: {droneState.roll}</p>
                    <p>yaw: {droneState.yaw}</p>
                    <p>pitch: {droneState.pitch}</p>
                </div>
            ) : (
                <p>Loading drone state...</p>
            )}
        </div>
    );
};

export default DroneState;