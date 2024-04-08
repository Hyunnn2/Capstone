import { useState } from 'react';

import './Main.css'
import Home from './home/Home';
import Info from './info/Info';


export default function Main() {
    return (
        <div className='Main'>
            <Home/>
            <Info/>
        </div>
    )
}