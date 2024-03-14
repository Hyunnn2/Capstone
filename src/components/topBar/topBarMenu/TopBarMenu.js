import { useState } from 'react'

import './TopBarMenu.css'
import Option from './option/Option.js'

export default function TopBarMenu() {

    const menuInfo = {
        'File': ['File Option 1', 'File Option 2', 'File Option 3', 'File Option 4'],
        'Edit': ['Edit Option 1', 'Edit Option 2', 'Edit Option 3', 'Edit Option 4'],
        'Help': ['Help Option 1', 'Help Option 2', 'Help Option 3', 'Help Option 4']
    }

    // 메뉴바 관련 필드, 메서드
    const [optionOpen, setOptionOpen] = useState(false)
    const [hoveredMenu, setHoveredMenu] = useState(null);

    const toggleMenu = () => {
        setOptionOpen(!optionOpen)
    }

    const handleMenuHover = (menu) => {
        setHoveredMenu(menu);
    }

    return (
        <div className='TopBarMenu'>
            {Object.keys(menuInfo).map(menu => (
                <div className='MenuBtn' id={menu} 
                    onMouseEnter={() => handleMenuHover(menu)}
                    onClick={toggleMenu}
                >
                    {menu}
                    {(optionOpen && hoveredMenu === menu) && <Option hoveredMenu={hoveredMenu} setHoveredMenu={setHoveredMenu} options={menuInfo[menu]} />}
                </div>
            ))}
        </div>
    )
}
