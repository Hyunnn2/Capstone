import { useState } from 'react';
import { MapProvider } from 'react-map-gl';
import './Main.css'
import Home from './home/Home';
import Info from './info/Info';


export default function Main() {
    return (
        <MapProvider>
            <div className='Main'>
                <Home/>
                <Info/>
            </div>
        </MapProvider>
    )
}