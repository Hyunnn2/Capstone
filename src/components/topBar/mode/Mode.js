import React, { useEffect, useState } from 'react';
import { fetchDroneHeader } from '../../../firebase_utils';

const Mode = () => {
  const [mode, setMode] = useState('MODE');

  useEffect(() => {
    const updateMode = (newState) => {
      if (newState.header === "mission_start" || newState.header === "resume") {
        setMode('AUTO');
      } else if (newState.header === "manual") {
        setMode('MANUAL');
      } else if (newState.header === "mission_finish" || newState.header === "land" || newState.header === "emergency") {
        setMode('MODE');
      }
    };

    fetchDroneHeader(updateMode);

    return () => {
      // 필요한 경우 cleanup 로직 추가
    };
  }, []);

  return (
    <div>{mode}</div>
  );
}

export default Mode;


