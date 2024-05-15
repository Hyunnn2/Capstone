import './Battery.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryQuarter, faBatteryHalf, faBatteryThreeQuarters, faBatteryFull } from '@fortawesome/free-solid-svg-icons';
import { useWebSocketData } from '../../../WebSocketDataContext';


export default function Battery() {
    const { webSocketData } = useWebSocketData();
    const batteryPercentage = webSocketData && webSocketData.battery ? webSocketData.battery : 50;

    return (
        <div className='Battery'>
            {batteryPercentage <= 30 && <FontAwesomeIcon icon={faBatteryQuarter} size='1x'/>}
            {(batteryPercentage <= 60 && batteryPercentage > 30) && <FontAwesomeIcon icon={faBatteryHalf} size='1x'/>}
            {(batteryPercentage <= 90 && batteryPercentage > 60) && <FontAwesomeIcon icon={faBatteryThreeQuarters} size='1x'/>}
            {(batteryPercentage > 90) && <FontAwesomeIcon icon={faBatteryFull} size='1x'/>}
            {`  ${batteryPercentage}%     `}
        </div>
    );
};





