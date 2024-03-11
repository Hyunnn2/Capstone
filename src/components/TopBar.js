import './TopBar.css';

import Menu from './Menu.js';

import Icon from '../assets/logo192.png'

export default function TopBar() {
    
    // 상단바 우측 버튼 클릭 관련 메서드
    const minimizeMainWindow = () => {
        window.mainWindowAPI.minimizeMainWindow()
    }

    const maximizeMainWindow = () => {
        window.mainWindowAPI.maximizeMainWindow()
    }

    const closeMainWindow = () => {
        window.mainWindowAPI.closeMainWindow()
    }

    return (
    <div className='topBar'>
        <img src={ Icon } alt='App Icon' className='appIcon' />
        <Menu />
        <div className='title'>
            My Electron - React Application
        </div>
        <div className='btnContainer'>
            <button onClick={minimizeMainWindow} className='minimizeBtn'>-</button>
            <button onClick={maximizeMainWindow} className='maximizeBtn'>□</button>
            <button onClick={closeMainWindow} className='closeBtn'>x</button>
        </div>
    </div>
    );
};