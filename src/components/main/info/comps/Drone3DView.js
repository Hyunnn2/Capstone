import React, { useEffect, useRef } from 'react';
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

        // Three.js WebGLRenderer 생성
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);

        // Three.js WebGLRenderer 배경 설정
        const canvas = renderer.domElement;
        //canvas.style.background = 'radial-gradient(circle farthest-corner at center top, #071021, #19324a)';
        //canvas.style.background = 'radial-gradient(circle farthest-corner at center top, #505C81, #56728C)';
        canvas.style.background = 'radial-gradient(circle farthest-corner at center top, #294361, #505C81)';
        
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
        const animate = () => {
            if (webSocketData && droneRef.current) {
                droneRef.current.rotation.x = webSocketData.pitch;
                droneRef.current.rotation.y = webSocketData.yaw;
                droneRef.current.rotation.z = webSocketData.roll;
            } else if (droneRef.current) { 
                droneRef.current.rotation.x += 0.01; //pitch
                droneRef.current.rotation.y += 0.01; //yaw
                droneRef.current.rotation.z += 0.01; //roll
            }
            rendererRef.current.render(sceneRef.current, cameraRef.current);
            requestAnimationFrame(animate);
        };
        animate();


    }, [webSocketData]);

    return (
        <div className='Drone3DViewContainer' ref={containerRef}>
            <div class="directionNorth">N</div>
            <div class="directionSouth">S</div>
            <div class="directionEast">E</div>
            <div class="directionWest">W</div>
        </div>
    );
};

export default Drone3DView;