import './Info.css'
import DroneState from "./comps/DroneState.js";
import Drone3DView from "./comps/Drone3DView.js";
import Streaming from './comps/Streaming.js';
import DroneStateDisplay from './comps/DroneStateDisplay.js';
import ModeTabs from './comps/ModeTabs.js';


export default function Info() {

    return (
        <div className='Info'>
            <ModeTabs />
            <DroneState/>
            <Drone3DView/>
            <Streaming/>
        </div>
    )
}