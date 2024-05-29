import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './ObjViewer.css'
import { Button } from '@mui/material';

const ObjViewer = () =>  {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
  
    const handleDownload = () => {
      window.electronAPI.downloadObj('http://203.255.57.136:5261/api/obj/mesh1.obj');
    };

    useEffect(() => {
        const container = containerRef.current;
        
    
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);
    
    
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2;
    
        // 조명 추가
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
    
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
    
    
        const loader = new OBJLoader();
        loader.load(
          '/mesh.obj',
          (object) => {
            scene.add(object);
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
          },
          (error) => {
            console.error('An error happened', error);
          }
        );
    
        camera.position.z = 5;
    
        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
    
        animate();
    
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
    
        return () => {
          // renderer.domElement.addEventListener('dblclick', null);
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
  
    return (
      <div className='ObjViewContainer' ref={containerRef} style={{overflow:'hidden', objectFit:'cover'}}>
        <Button 
        id="download-btn" 
        onClick={handleDownload}
        sx={{position: 'absolute', bottom: '10px', left: '30px', zIndex:'11'}}>
            Download OBJ File
        </Button>
      </div>
    );
  };
export default ObjViewer