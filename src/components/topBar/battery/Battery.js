import './Battery.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryQuarter, faBatteryHalf, faBatteryThreeQuarters, faBatteryFull } from '@fortawesome/free-solid-svg-icons';
// import { ipcRenderer } from 'electron';
import { useState } from 'react';


export default function Battery() {

    const [batteryRemain, setBatteryRemain] = useState(70)

    // ipcRenderer.on('Battery', () => {
    //     setBatteryRemain("배터리잔량")
    // })



    return (
        <div className='Battery'>
            {batteryRemain <= 30 && <FontAwesomeIcon icon={faBatteryQuarter} size='1x'/>}
            {(batteryRemain <= 60 && batteryRemain > 30) && <FontAwesomeIcon icon={faBatteryHalf} size='1x'/>}
            {(batteryRemain <= 90 && batteryRemain > 60) && <FontAwesomeIcon icon={faBatteryThreeQuarters} size='1x'/>}
            {(batteryRemain > 90) && <FontAwesomeIcon icon={faBatteryFull} size='1x'/>}
        </div>
    );
};





