//파이어스토어에서 위도, 경도, 고도 값 받아오기
import React, { useEffect, useState } from 'react';
import { fetchDroneHeader } from '../../../../firebase_utils'
import './DroneState.css';


const DroneStateDisplay = () => {
    const [droneState, setDroneState] = useState(null);

    useEffect(() => {
        const getDroneState = async () => {
            try {
                const state = await fetchDroneHeader(); // Firestore에서 드론 상태 가져오기
                setDroneState(state); // 상태 설정
            } catch (error) {
                console.error('Error fetching drone state:', error);
            }
        };

        getDroneState(); // 드론 상태 가져오기 함수 호출
    }, []);

    return (
        <div className='DroneStateContainer'>
            <h2>드론 상태창</h2>
            {droneState ? (
                <div>
                    <p>header: {droneState.header}</p>
                    
                </div>
            ) : (
                <p>Loading drone state...</p>
            )}
        </div>
    );
};

export default DroneStateDisplay;