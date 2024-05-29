import './Info.css'
import DroneState from "./comps/DroneState.js";
import Drone3DView from "./comps/Drone3DView.js";
import Streaming from './comps/Streaming.js';
import ModeTabs from './comps/ModeTabs.js';


export default function Info() {

    return (
        <div className='Info'>
            <div className='SpaceBetweenComponents'></div>
            <ModeTabs />
            <div className='SpaceBetweenComponents'></div>
            <DroneState/>
            <div className='SpaceBetweenComponents'></div>
            <Drone3DView/>
            <div className='SpaceBetweenComponents'></div>

        </div>
    )
}