import './SideBarMenu.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faSearch, faCog } from '@fortawesome/free-solid-svg-icons';


export default function SideBarMenu({setCurrentComp}) {

    const selectSideBarComp = (comp) => {
        setCurrentComp((prevComp) => (prevComp === comp ? null : comp));
    };


    return (
        <div className="SideBarMenu">
                <button className='SideBarBtn' id='Explorer' onClick={() => selectSideBarComp('Explorer')}>
                    <FontAwesomeIcon icon={faFolderOpen} size='2x'/>
                </button>
                <button className='SideBarBtn' id='Search' onClick={() => selectSideBarComp('Search')}>
                    <FontAwesomeIcon icon={faSearch} size='2x'/>
                </button>
                <button className='SideBarBtn' id='Setting' onClick={() => selectSideBarComp('Setting')}>
                    <FontAwesomeIcon icon={faCog} size='2x'/>
                </button>
            </div>
    )
}