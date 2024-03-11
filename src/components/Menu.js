import { useState, useEffect } from 'react'
import './Menu.css'

export default function Menu() {

    // 메뉴바 관련 필드, 메서드
    const [selectedMenu, setSelectedMenu] = useState('null')

    const toggleMenu = (menu) => {
        setSelectedMenu((prevMenu) => (prevMenu === menu ? null : menu))
    }

    useEffect(() => {
    }, [selectedMenu])


    return (
        <div className="menu">
            <button onClick={() => toggleMenu('File')}>File</button>
            {selectedMenu === 'File' && <FileOptions />}
            <button onClick={() => toggleMenu('Edit')}>Edit</button>
            {selectedMenu === 'Edit' && <EditOptions />}
        </div>
    )
}


function FileOptions() {

    // 옵션 클릭 이벤트 처리 관련 메서드
    const handleOptionClick = (option) => {
        console.log(`${option} clicked`)
    }

    return (
        <div className='options' id='fileOptions'>
            <button onClick={() => handleOptionClick('File 1')}>File 1</button>
            <button onClick={() => handleOptionClick('File 2')}>File 2</button>
            <button onClick={() => handleOptionClick('File 3')}>File 3</button>
            <button onClick={() => handleOptionClick('File 4')}>File 4</button>
            <button onClick={() => handleOptionClick('File 5')}>File 5</button>
        </div>
    )
}

function EditOptions() {

    // 옵션 클릭 이벤트 처리 관련 메서드
    const handleOptionClick = (option) => {
        console.log(`${option} clicked`)
    }

    return (
        <div className='options' id='editOptions'>
            <button onClick={() => handleOptionClick('Edit 1')}>Edit 1</button>
            <button onClick={() => handleOptionClick('Edit 2')}>Edit 2</button>
            <button onClick={() => handleOptionClick('Edit 3')}>Edit 3</button>
            <button onClick={() => handleOptionClick('Edit 4')}>Edit 4</button>
            <button onClick={() => handleOptionClick('Edit 5')}>Edit 5</button>
        </div>
    )
}
