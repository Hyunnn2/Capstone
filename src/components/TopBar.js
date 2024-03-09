import React from 'react';
import './TopBar.css';

export default function TopBar() {
    
    const minimizeMainWindow = () => {
        window.mainWindowAPI.minimizeMainWindow()
    }

    return (
        <header>
            <div className="topBar">
                <div className="btnContainer">
                    <button className="menuBtn">*</button>
                </div>
                <div className="title">
                    My Electron - React Application
                </div>
                <div className="topBarBtns">
                    <button onClick={ minimizeMainWindow } className="minimizeBtn">-</button>
                    <button className="maximizeBtn">□</button>
                    <button className="closeBtn">x</button>
                </div>
            </div>
        </header>
    );
};