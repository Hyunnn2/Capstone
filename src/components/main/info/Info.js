import './Info.css'
import DroneState from "./comps/DroneState2.js";
import Drone3DView from "./comps/Drone3DView.js";
import Streaming from './comps/Streaming.js';


export default function Info() {

    return (
        <div className='Info'>
            <DroneState/>
            <Drone3DView/>
            <Streaming/>
            
        </div>
    )
}