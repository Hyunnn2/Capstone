import React, {useEffect, useRef, useState} from 'react'
import { MapProvider, Map, Marker, Source, Layer } from 'react-map-gl';
import Map3DLayer from './Map3DLayer';
import MapMenu from './MapMenu';
import { useSelector } from 'react-redux';
import mapboxgl from "mapbox-gl";
import { useWebSocketData } from '../../../../WebSocketDataContext';



const folderColors = {
    '비행금지구역': '#FF0000', // 빨간색
    '비행제한구역': '#FFA500', // 노란색
    '공항': '#FFFF00',
    '비행장': '#008000',
    '초경량비행장치 전용공역(비행가능)': '#0000FF'
};

const Maps = () => {
    const mapRef=useRef();
    const { lat, lng, geojsons } = useSelector((state) => state);
    const [_customLayer,setCustomlayer]=useState(null);
    const droneRef = useRef(null);

    const { webSocketData } = useWebSocketData();


    useEffect(()=>{
        const modelOrigin = [128.1038, 35.1535];
        const modelAltitude = 0;
        const modelRotate = [Math.PI / 2, 0, 0];

        const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
            modelOrigin,
            modelAltitude
        );
    
        const modelTransform = {
            translateX: modelAsMercatorCoordinate.x,
            translateY: modelAsMercatorCoordinate.y,
            translateZ: modelAsMercatorCoordinate.z,
            rotateX: modelRotate[0],
            rotateY: modelRotate[1],
            rotateZ: modelRotate[2],
            scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
        };
    
        const THREE = window.THREE;
    
        const customLayer = {
            id: '3d-model',
            type: 'custom',
            renderingMode: '3d',
            onAdd: function (map, gl) {
                this.camera = new THREE.Camera();
                this.scene = new THREE.Scene();
               
                const directionalLight = new THREE.DirectionalLight(0xffffff);
                directionalLight.position.set(0, 60, 100).normalize();
                this.scene.add(directionalLight);

                const directionalLight2 = new THREE.DirectionalLight(0xffffff);
                directionalLight.position.set(0, -60, 100).normalize();
                this.scene.add(directionalLight2);
    
    
                const loader = new THREE.GLTFLoader();
                loader.load(
                    'drone/scene.gltf', 
                    (gltf) => {
                        const drone = gltf.scene;
                        this.scene.add(drone);
                        console.log('Map Model loaded successfully:', drone);
                        drone.scale.set(0.5, 0.5, 0.5);
                        
                        droneRef.current = drone;
                    }
                );
                this.map = map;
    
                this.renderer = new THREE.WebGLRenderer({
                    canvas: map.getCanvas(),
                    context: gl,
                    antialias: true
                });
    
                this.renderer.autoClear = false;
            },
            render: function (gl, matrix) {
                const rotationX = new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(1, 0, 0),
                    modelTransform.rotateX
                );
                const rotationY = new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(0, 1, 0),
                    modelTransform.rotateY
                );
                const rotationZ = new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(0, 0, 1),
                    modelTransform.rotateZ
                );
    
                const m = new THREE.Matrix4().fromArray(matrix);
                const l = new THREE.Matrix4()
                    .makeTranslation(
                        modelTransform.translateX,
                        modelTransform.translateY,
                        modelTransform.translateZ
                    )
                    .scale(
                        new THREE.Vector3(
                            modelTransform.scale,
                            -modelTransform.scale,
                            modelTransform.scale
                        )
                    )
                    .multiply(rotationX)
                    .multiply(rotationY)
                    .multiply(rotationZ);
    
                this.camera.projectionMatrix = m.multiply(l);
                this.renderer.resetState();
                this.renderer.render(this.scene, this.camera);
                this.map.triggerRepaint();
            }
        };
        setCustomlayer(customLayer)    

    }, []);

    return (
        <MapProvider>
            <Map                
                id='map'    
                mapboxAccessToken="pk.eyJ1Ijoic3VleWVvbjIyIiwiYSI6ImNsdXBqZno0djBtZW8ybW1uOGo0dnY2Z3AifQ.Kwj0EDyPSHxKsMKaxGWTlw"
                initialViewState={{
                    longitude: 128.1038,
                    latitude: 35.1535,
                    zoom: 16,
                    antialias: true,
                    pitch:60
                }}
                //style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/light-v10"

                ref={mapRef}
                onLoad={(map)=>{
                    map.target.addLayer(_customLayer);
                }}
            >
                <MapMenu />
                <Map3DLayer />
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