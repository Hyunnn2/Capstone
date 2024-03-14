import { useState } from 'react'

import './SideBar.css'
import Explorer from './comps/explorer/Explorer';


import SideBarMenu from './sideBarMenu/SideBarMenu';


export default function SideBar() {
    const [currentComp, setCurrentComp] = useState(null)


    let compSellector = {
        'Explorer': <Explorer/>
    }


    return (
        <div className='SideBar'>
            <SideBarMenu setCurrentComp={setCurrentComp}/>
            {currentComp &&
                <div className='SideBarComp'>
                    {currentComp !== null && compSellector[currentComp]}
                </div>
            }
        </div>            
    )
}
