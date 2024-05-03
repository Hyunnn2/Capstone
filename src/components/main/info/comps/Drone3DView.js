import React, { useEffect, useRef } from 'react';
import './Drone3DView.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';


const Drone3DView = () => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

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
        

        // Three.js Scene 생성
        const scene = new THREE.Scene();

        // Three.js Camera 생성
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000); // 초기 비율을 1로 설정
        camera.position.set(0, 0.5, 0);
        camera.lookAt(0, 0, 0);

        // Three.js WebGLRenderer 생성
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);
        renderer.setClearAlpha(1);
        renderer.setClearColor(0xD1EEFC, 1);

        // Three.js WebGLRenderer 배경 설정
        renderer.setClearColor(0x000000, 0); // 배경색을 투명으로 설정
        const canvas = renderer.domElement;
        //canvas.style.background = 'radial-gradient(circle farthest-corner at center top, #071021, #19324a)';
        canvas.style.background = 'radial-gradient(circle farthest-corner at center top, #505C81, #56728C)';
        //canvas.style.background = 'radial-gradient(circle farthest-corner at center top, #294361, #505C81)';

         // CSS2DRenderer 생성
         const cssRenderer = new CSS2DRenderer();
         cssRenderer.setSize(container.offsetWidth, container.offsetHeight);
         cssRenderer.domElement.style.position = 'absolute';
         cssRenderer.domElement.style.top = 0;
         cssRenderer.domElement.style.left = 0;
         container.appendChild(cssRenderer.domElement);

        // Directional Light 추가
        const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // Drone 모델 로드
        const loader = new GLTFLoader();
        loader.load(
            'animated_drone/scene.gltf', 
            (gltf) => {
                const drone = gltf.scene;
                scene.add(drone);
                console.log('Model loaded successfully:', drone);
                drone.scale.set(1, 1, 1);
            
                const animate = () => {
                    requestAnimationFrame(animate);
                
                    drone.rotation.x += 0.01; //pitch
                    drone.rotation.y += 0.01; //yaw
                    drone.rotation.z += 0.01; //roll
                    renderer.render(scene, camera);
                    cssRenderer.render(scene, camera);
                };

                animate();
            },
            undefined,
            (error) => {
                console.error('Error loading model:', error);
            }
        );


        // Compass 추가
        const compassDiv = document.createElement('div');
        compassDiv.className = 'compass';
        compassDiv.innerHTML = `
            <div class="directionNorth">N</div>
            <div class="directionSouth">S</div>
            <div class="directionEast">E</div>
            <div class="directionWest">W</div>
        `;
        const compassObject = new CSS2DObject(compassDiv);
        scene.add(compassObject);

        // 렌더러 및 카메라 참조 저장
        rendererRef.current = renderer;
        cameraRef.current = camera;

        handleResize(); // 초기 렌더러 및 카메라 크기 설정

       

        // 클린업 함수
        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            container.removeChild(cssRenderer.domElement);
        };
    }, []);

    return (
        <div className='Drone3DViewContainer' ref={containerRef}>
        
        </div>
    );
};

export default Drone3DView;