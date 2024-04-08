import { useState } from 'react';

import './Info.css'
import DroneState from "./comps/DroneState.js";
import Drone3DView from "./comps/Drone3DView.js"


export default function Info() {

    return (
        <div className='Info'>
            <DroneState/>
            
            
            {/* <Etc/> */}
        </div>
    )
}