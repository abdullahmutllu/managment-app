'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Page = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ----- 1. Sahne (Scene) -----
    const scene = new THREE.Scene();

    // ----- 2. Kamera -----
    const camera = new THREE.PerspectiveCamera(
      75, // FOV (Field of View)
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near
      1000 // Far
    );
    camera.position.z = 5;

    // ----- 3. Renderer -----
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true; // Gölgeyi aç
    containerRef.current.appendChild(renderer.domElement);

    // ----- 4. Objeler -----
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = -2;
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // ----- 5. Işıklar -----
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Genel aydınlatma
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Güneş ışığı gibi
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true; // Gölgeyi aç
    scene.add(directionalLight);

    // ----- 6. Animasyon Döngüsü -----
    let frameId; // requestAnimationFrame ID'si => id memory lake i engellemek için
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate); // Kendini sürekli çağırır
    };
    animate();

    // ----- 7. Pencere boyutu değişince -----
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ----- 8. Cleanup -----
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId); // Animasyonu durdur
      renderer.dispose();
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default Page;
