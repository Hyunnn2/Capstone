import React, { useEffect, useRef} from 'react';
import './Drone3DView.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useWebSocketData } from '../../../../WebSocketDataContext';


const Drone3DView = () => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const droneRef = useRef(null);
    const sceneRef = useRef(new THREE.Scene());

    const { webSocketData } = useWebSocketData();

    useEffect(() => {
        const container = containerRef.current;

        // Three.js Scene 생성
        const scene = sceneRef.current;

        // Three.js Camera 생성
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000); // 초기 비율을 1로 설정
        camera.position.set(0, 0.5, 0);
        camera.lookAt(0, 0, 0);
        camera.rotation.z = Math.PI;

        // Three.js WebGLRenderer 생성
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);

        // Three.js WebGLRenderer 배경 설정
        const canvas = renderer.domElement;
        canvas.style.background = 'radial-gradient(circle farthest-corner at center top, #505C81, #56728C)';
        
        // Directional Light 추가
        const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
        directionalLight.position.set(1,1,1).normalize();
        scene.add(directionalLight);


        if (!droneRef.current) {
            // Drone 모델 로드
            const loader = new GLTFLoader();
            loader.load(
                'animated_drone/scene.gltf', 
                (gltf) => {
                    const drone = gltf.scene;
                    sceneRef.current.add(drone);
                    console.log('Model loaded successfully:', drone);
                    drone.scale.set(1, 1, 1);
                    // drone.rotation.set(0,Math.PI,0);
                    droneRef.current = drone;
                },
                undefined,
                (error) => {
                    console.error('Error loading model:', error);
                }
            ); 
        }

        // 렌더러 및 카메라 참조 저장
        rendererRef.current = renderer;
        cameraRef.current = camera;

        // 창 크기 변경 시 적절한 조치를 취하기 위한 핸들러
        const handleResize = () => {
            const renderer = rendererRef.current;
            const camera = cameraRef.current;
            if (renderer && camera ) {
                const width = container.offsetWidth;
                const height = container.offsetHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        };
        window.addEventListener('resize', handleResize);

        // 클린업 함수
        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
        };
    }, []);
    
    useEffect(() => {

        const northElement = document.querySelector('.directionNorth');
        const southElement = document.querySelector('.directionSouth');
        const eastElement = document.querySelector('.directionEast');
        const westElement = document.querySelector('.directionWest');

        const animate = () => {
            if (webSocketData && droneRef.current) {
                droneRef.current.rotation.x = -((webSocketData.pitch/180)*Math.PI);
                droneRef.current.rotation.y = -((webSocketData.yaw/180)*Math.PI);
                droneRef.current.rotation.z = ((webSocketData.roll/180)*Math.PI);

                const yaw = webSocketData.yaw;
                if (yaw >= 0 && yaw <= 90) {
                    northElement.style.color = '#0019FF';
                    southElement.style.color = 'whitesmoke';
                    eastElement.style.color = 'whitesmoke';
                    westElement.style.color = 'whitesmoke';
                } else if (yaw > 90 && yaw <= 180) {
                    northElement.style.color = 'whitesmoke';
                    southElement.style.color = 'whitesmoke';
                    eastElement.style.color = '#0019FF';
                    westElement.style.color = 'whitesmoke';
                } else if (yaw < 0 && yaw >= -90) {
                    northElement.style.color = 'whitesmoke';
                    southElement.style.color = 'whitesmoke';
                    eastElement.style.color = 'whitesmoke';
                    westElement.style.color = '#0019FF';
                } else if (yaw < -90 && yaw >= -180) {
                    northElement.style.color = 'whitesmoke';
                    southElement.style.color = '#0019FF';
                    eastElement.style.color = 'whitesmoke';
                    westElement.style.color = 'whitesmoke';
                }

            } else if (droneRef.current) { 
                // droneRef.current.rotation.x += 0.01; //pitch - 앞으로 돈다 -
                // droneRef.current.rotation.y += 0.01; //yaw - 왼쪽으로 돈다 -
                // droneRef.current.rotation.z += 0.01; //roll - 오른쪽으로 돈다 +
            }
            rendererRef.current.render(sceneRef.current, cameraRef.current);
            requestAnimationFrame(animate);
        };
        animate();
    }, [webSocketData]);


    return (
        <div className='Drone3DViewContainer' ref={containerRef}>
            <div className='directionNorth'>N</div>
            <div className='directionSouth'>S</div>
            <div className='directionEast'>E</div>
            <div className='directionWest'>W</div>
        </div>
    );
};

export default Drone3DView;