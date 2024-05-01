import React from 'react'
import {MapProvider, Map, Marker} from 'react-map-gl';
import Map3DLayer from './Map3DLayer';
import MapMenu from './MapMenu';
import { useSelector } from 'react-redux';


const Maps = () => {
    const destination = useSelector((state)=>state.destination) 

    return (
        <MapProvider>
            <Map
                id='map'
                mapboxAccessToken="pk.eyJ1Ijoic3VleWVvbjIyIiwiYSI6ImNsdXBqZno0djBtZW8ybW1uOGo0dnY2Z3AifQ.Kwj0EDyPSHxKsMKaxGWTlw"
                initialViewState={{
                    longitude: 128.1038,
                    latitude: 35.1535,
                    zoom: 14
                }}
                style={{ width: 600, height: '100%' }}
                mapStyle="mapbox://styles/mapbox/light-v10"
            >
                <MapMenu />
                <Map3DLayer />
                <Marker longitude={destination.lng} latitude={destination.lat} color="blue" draggable={false}/>
            </Map>
        </MapProvider>
    )
}

export default Maps