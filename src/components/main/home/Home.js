import React from 'react';
import './Home.css';
import Maps from './maps/Maps.js';
import Zed3DMapping from './zed/Zed3DMapping.js';
import ResizableButton from './ResizableButton.js';


const Home = () => {
    return (
        <div className='Home'>    
            <Maps />
            <ResizableButton/>
            <Zed3DMapping />
        </div>
    );
};

export default Home;
