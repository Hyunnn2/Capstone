import { useState, useEffect } from 'react'

import './Explorer.css'
import Directory from './directory/Directory.js'


export default function Explorer() {
    const [selectedDirectory, setSelectedDirectory] = useState(null)
    const [contents, setContents] = useState(null)

    const selectDirectory = async () => {
        const res = await window.electronAPI.openDirectory()
        setSelectedDirectory(res.selectedDirectory)
        setContents(res.contents)
    }

    useEffect(() => {
        console.log(selectedDirectory)
        console.log(contents)
    }, [selectedDirectory, contents])


    return (
        <div className='Explorer'>
            {selectedDirectory === null && (
                <button className='SelectDirectoryBtn' onClick={selectDirectory}>Select Directory</button>
            )}
            {selectedDirectory && <Directory directoryName={selectedDirectory} contents={contents}/>}
        </div>
    )
}
