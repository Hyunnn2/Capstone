import React from 'react'
import { MapProvider, Map, Marker, Source, Layer } from 'react-map-gl';
import Map3DLayer from './Map3DLayer';
import MapMenu from './MapMenu';
import Map3DModel from './Map3DModel';
import { useSelector } from 'react-redux';


const folderColors = {
    '비행금지구역': '#FF0000', // 빨간색
    '비행제한구역': '#FFA500', // 노란색
    '공항': '#FFFF00',
    '비행장': '#008000',
    '초경량비행장치 전용공역(비행가능)': '#0000FF'
};

const Maps = () => {
    const { lat, lng, geojsons } = useSelector((state) => state)
    

        return (
        <MapProvider>
            <Map                
                id='map'    
                mapboxAccessToken="pk.eyJ1Ijoic3VleWVvbjIyIiwiYSI6ImNsdXBqZno0djBtZW8ybW1uOGo0dnY2Z3AifQ.Kwj0EDyPSHxKsMKaxGWTlw"
                initialViewState={{
                    longitude: 128.1038,
                    latitude: 35.1535,
                    zoom: 14,
                    antialias: true,
                    pitch:60
                }}
                //style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/light-v10"
            >
                <MapMenu />
                <Map3DLayer />
                <Map3DModel />
                <Marker longitude={lng} latitude={lat} color="blue" draggable={false} />
                {geojsons.map((data, index) => {
                    // 폴더 이름에 해당하는 색상 가져오기
                    const color = folderColors[data.folderName] || '#0080ff'; // 기본값으로 파란색 사용
                    return (
                        <Source id={`${index}`} type='geojson' data={data.geojson} key={`${index}`}>
                            <Layer
                                id={`${index}-fill`}
                                type='fill'
                                paint={{
                                    'fill-color': color, // 폴더 이름에 해당하는 색상 설정
                                    'fill-opacity': 0.5 // 폴리곤 투명도 설정
                                }}
                            />
                            <Layer
                                id={`${index}-fill`}
                                type='line'
                                paint={{
                                    'line-color': color,
                                    'line-width': 2
                                }}
                            />
                        </Source>
                    )
                })}
            </Map>
        </MapProvider>
    )
}

export default Maps