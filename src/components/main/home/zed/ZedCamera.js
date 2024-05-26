import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Zed3DMapping from './Zed3DMapping';
import VideoPlayer from './VideoPlayer';
import ObjViewer from './ObjViewer';

const ZedCamera = () => {
    const [zedType, setZedType] = useState('Streaming');
    const handleChange = (event, newZedType) => {
        setZedType(newZedType);
    };

    let ZedComponent;
    if (zedType === 'Streaming') {
        ZedComponent = <VideoPlayer />;
    } else if (zedType === 'Zed3DMapping') {
        ZedComponent = <Zed3DMapping />;
    } else if (zedType === 'ZedOBJ') {
        ZedComponent = <ObjViewer />;
    }

    return (
        <div style={{  display: 'flex', justifyContent: 'flex-start', position: 'relative',width: '100%', height: '100%', zIndex:'11'}}>
            <ToggleButtonGroup
                color="primary"
                value={zedType}
                exclusive
                onChange={handleChange}
                aria-label="Zed"
                style={{ position: 'absolute', top: '10px', left: '30px', zIndex: '1000' }}
            >
                <ToggleButton value="Streaming">Streaming</ToggleButton>
                <ToggleButton value="Zed3DMapping">3D mapping</ToggleButton>
                <ToggleButton value="ZedOBJ">3D Viewer</ToggleButton>
            </ToggleButtonGroup>
            {ZedComponent}
        </div>
    );
};

export default ZedCamera;