import { useState, useEffect } from 'react'

import './Explorer.css'


export default function Explorer() {
    const [selectedDirectory, setSelectedDirectory] = useState(null)
    const [files, setFiles] = useState(null)

    const selectDirectory = async () => {
        const res = await window.electronAPI.openDirectory()
        setSelectedDirectory(res.selectedDirectory)
        setFiles(res.files)
    }

    useEffect(() => {
        console.log(selectedDirectory)
        console.log(files)
    }, [selectedDirectory, files])


    return (
        <div className='Explorer'>
            {selectedDirectory === null && (
                <button className='SelectDirectoryBtn' onClick={selectDirectory}>Select Directory</button>
            )}
            {selectedDirectory && (
                <div>
                    <p>Files in {selectedDirectory}:</p>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>{file}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
