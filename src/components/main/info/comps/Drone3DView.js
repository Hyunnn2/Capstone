import React, { useEffect, useRef } from 'react';
import './Drone3DView.css';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

const Drone3DView = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        // Scene
        const scene = new THREE.Scene();
        
        // Camera
        const camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        camera.position.set(0, 0, 0.25); // 카메라의 위치 설정

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true }); // 안티앨리어싱 활성화
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0xfffff0);
        container.appendChild(renderer.domElement);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
        directionalLight.position.set(1, 1, 1).normalize(); // 조명의 위치 설정
        scene.add(directionalLight);

         // Load Drone GLTF model
        const loader = new GLTFLoader();
        loader.load(
            'animated_drone/scene.gltf', 
            (gltf) => {
                const drone = gltf.scene;
                scene.add(drone);
                console.log('Model loaded successfully:', drone);

                drone.scale.set(0.8, 0.8, 0.8);
                
                // Animation
                const animate = () => {
                    requestAnimationFrame(animate);
                    drone.rotation.y += 0.01; // 회전 애니메이션
                    renderer.render(scene, camera);
                };

                animate();
            },
            undefined,
            (error) => {
                console.error('Error loading model:', error);
            }
        );

        return () => {
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div className='Drone3DViewContainer' ref={containerRef}>
            <h2>Drone 3D view</h2>
        </div>
    );
};

export default Drone3DView;
