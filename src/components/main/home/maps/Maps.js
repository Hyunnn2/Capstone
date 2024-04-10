import React, { useRef, useEffect, useState } from 'react';
import './Maps.css';
import mapboxgl from 'mapbox-gl'; 


mapboxgl.accessToken = 'pk.eyJ1Ijoic3VleWVvbjIyIiwiYSI6ImNsdXBqZno0djBtZW8ybW1uOGo0dnY2Z3AifQ.Kwj0EDyPSHxKsMKaxGWTlw';

const Maps = () => {

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [128.1038, 35.1535],
            zoom: 15.5,
            pitch: 45,
            bearing: 7,
            antialias: true
        });
    
        map.on('style.load', () => {
            const layers = map.getStyle().layers;
            const labelLayerId = layers.find(
                layer => layer.type === 'symbol' && layer.layout['text-field']
            ).id;

            map.addLayer(
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

        map.on('click', (e) => {
            var coordinates = e.lngLat;
            console.log(coordinates)
            const marker = new mapboxgl.Marker()
                .setLngLat(coordinates)
                .addTo(map);

            // Create a popup to display coordinates
            const popup = new mapboxgl.Popup({ offset: 25 })
                .setLngLat(coordinates)
                .setHTML(`<h3>위도: ${coordinates.lat}</h3><p>경도: ${coordinates.lng}</p>`)
                .addTo(map);

            // Remove marker and popup on close
            marker.getElement().addEventListener('click', () => {
                marker.remove();
                popup.remove();
            });
        });


        // Clean up
        return () => map.remove();
    }, []);
    

    return <div id="map" className='Maps' style={{  }}/>;
};

export default Maps;


