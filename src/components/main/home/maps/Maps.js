import React, { useEffect, useState } from 'react';
import './Maps.css';
import mapboxgl from 'mapbox-gl';

import MapMenu from './MapMenu'

mapboxgl.accessToken = 'pk.eyJ1Ijoic3VleWVvbjIyIiwiYSI6ImNsdXBqZno0djBtZW8ybW1uOGo0dnY2Z3AifQ.Kwj0EDyPSHxKsMKaxGWTlw';
const center = [128.1038, 35.1535]
const Maps = () => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const initializeMap = () => {
            const initializedMap = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/light-v10',
                center: center,
                zoom: 15.5,
                pitch: 45,
                bearing: 7,
                antialias: true
            });

            initializedMap.on('style.load', () => {
                const layers = initializedMap.getStyle().layers;
                const labelLayerId = layers.find(
                    layer => layer.type === 'symbol' && layer.layout['text-field']
                ).id;

                initializedMap.addLayer(
                    {
                        'id': 'add-3d-buildings',
                        'source': 'composite',
                        'source-layer': 'building',
                        'filter': ['==', 'extrude', 'true'],
                        'type': 'fill-extrusion',
                        'minzoom': 15,
                        'paint': {
                            'fill-extrusion-color': '#aaa',
                            'fill-extrusion-height': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'height']
                            ],
                            'fill-extrusion-base': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'min_height']
                            ],
                            'fill-extrusion-opacity': 0.6
                        },
                    },
                    labelLayerId
                );
            });

            return initializedMap;
        };

        const map = initializeMap();
        setMap(map);

        // Clean up
        return () => map.remove();
    }, []);


    return (
        <div id="map" className='Maps' style={{}}>
            <MapMenu map={map} />     
        </div>
    );
};

export default Maps;
