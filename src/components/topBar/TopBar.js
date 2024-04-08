import './TopBar.css'
import Battery from './battery/Battery.js';
import Icon from '../../assets/logo192.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faWindowMaximize, faWindowClose } from '@fortawesome/free-solid-svg-icons';


export default function TopBar() {
    
    // 상단바 우측 버튼 클릭 관련 메서드
    const minimizeMainWindow = () => {
        window.electronAPI.minimizeMainWindow()
    }

    const maximizeMainWindow = () => {
        window.electronAPI.maximizeMainWindow()
    }

    const closeMainWindow = () => {
        window.electronAPI.closeMainWindow()
    }

    return (
    <div className='TopBar'>
        <img src={ Icon } alt='App Icon' className='AppIcon' />
        <Battery />
        <label className='TopBarTitle'> MyGCS</label>
        <button className='TopBarBtn' id='MinimizeBtn' onClick={minimizeMainWindow}>
            <FontAwesomeIcon icon={faWindowMinimize} size='1x'/>
        </button>
        <button className='TopBarBtn' id='MaximizeBtn' onClick={maximizeMainWindow}>
            <FontAwesomeIcon icon={faWindowMaximize} size='1x'/>
        </button>
        <button className='TopBarBtn' id='CloseBtn' onClick={closeMainWindow}>
            <FontAwesomeIcon icon={faWindowClose} size='1x'/>
        </button>
    </div>
    );
};





