// Home.js
import React from 'react';
import './Home.css';
import Maps from './maps/Maps.js';
import Zed3DMapping from './zed/Zed3DMapping.js';

const Home = () => {
    return (
        <div className='Home'>
            <Maps/>
            <Zed3DMapping/>
        </div>
    );
};

export default Home;
