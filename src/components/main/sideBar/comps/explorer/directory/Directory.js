import Select from 'react-select';

import './Directory.css'

export default function Directory({directoryName, contents}) {
    
    return (
        <Select className='Directory' options={contents} placeholder={directoryName}/>
    )
}