'use client';
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const AuthScene = ({ mode, onFormSubmit }) => {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const scene = useRef();
  const renderer = useRef();
  const camera = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer
    renderer.current = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.current.setSize(container.clientWidth, container.clientHeight);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.current.domElement);

    // Scene & Camera
    scene.current = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.current.position.z = 25;

    // Gezegen oluşturma fonksiyonu
    const createPlanet = (radius, color, x, y, z) => {
      const geometry = new THREE.SphereGeometry(radius, 32, 32); // Düşük çözünürlük
      const material = new THREE.MeshPhongMaterial({
        color,
        shininess: 80,
        specular: 0xffffff,
        emissive: color,
        emissiveIntensity: 0.1
      });
      
      const planet = new THREE.Mesh(geometry, material);
      planet.position.set(x, y, z);
      return planet;
    };

    // Halka oluşturma fonksiyonu (Satürn için)
    const createRing = (innerRadius, outerRadius, color, x, y, z) => {
      const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color, 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        emissive: color,
        emissiveIntensity: 0.2
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(x, y, z);
      return ring;
    };

    // Gezegenler
    const sun = createPlanet(3, 0xffdd00, -20, 0, -15);
    const mercury = createPlanet(1.5, 0xcccccc, -10, 3, -10);
    const venus = createPlanet(1.2, 0xffaa33, 0, -4, -8);
    const earth = createPlanet(1.5, 0x2277ff, 10, 5, -5);
    const mars = createPlanet(1.0, 0xff4422, 20, -3, -3);
    const jupiter = createPlanet(2.5, 0xffcc99, -15, 10, 0);
    const saturn = createPlanet(2.0, 0xffeeaa, 5, -10, 2);
    const saturnRings = createRing(4.5, 6.5, 0xffffaa, 5, -10, 2);

    // Gezegenleri sahneye ekle
    scene.current.add(sun);
    scene.current.add(mercury);
    scene.current.add(venus);
    scene.current.add(earth);
    scene.current.add(mars);
    scene.current.add(jupiter);
    scene.current.add(saturn);
    scene.current.add(saturnRings);

    // Işıklandırma
    const ambientLight = new THREE.AmbientLight(0x333333, 0.7);
    scene.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.current.add(directionalLight);

    // Yıldızlar
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000; // Daha az yıldız
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 300;
      positions[i3 + 1] = (Math.random() - 0.5) * 300;
      positions[i3 + 2] = (Math.random() - 0.5) * 300;
    }
    
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.0,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.current.add(stars);

    // Mouse etkileşimi
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mousePosition.current = {
        x: ((event.clientX - rect.left) / container.clientWidth) * 2 - 1,
        y: -((event.clientY - rect.top) / container.clientHeight) * 2 + 1
      };
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animasyon
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Mouse etkisi ile kamera hareketi
      camera.current.position.x += (mousePosition.current.x * 3 - camera.current.position.x) * 0.01;
      camera.current.position.y += (mousePosition.current.y * 3 - camera.current.position.y) * 0.01;
      camera.current.lookAt(scene.current.position);
      
      // Yıldızları döndür
      stars.rotation.y = elapsedTime * 0.002;
      
      // Gezegenleri döndür
      sun.rotation.y += 0.002;
      mercury.rotation.y += 0.008;
      venus.rotation.y += 0.006;
      earth.rotation.y += 0.007;
      mars.rotation.y += 0.006;
      jupiter.rotation.y += 0.012;
      saturn.rotation.y += 0.010;
      saturnRings.rotation.y += 0.010;
      
      // Gezegenleri yörüngede hareket ettir
      mercury.position.x = -10 + Math.sin(elapsedTime * 0.5) * 3;
      mercury.position.y = 3 + Math.cos(elapsedTime * 0.5) * 2;
      
      venus.position.x = 0 + Math.sin(elapsedTime * 0.4) * 4;
      venus.position.y = -4 + Math.cos(elapsedTime * 0.4) * 3;
      
      earth.position.x = 10 + Math.sin(elapsedTime * 0.3) * 5;
      earth.position.y = 5 + Math.cos(elapsedTime * 0.3) * 4;
      
      mars.position.x = 20 + Math.sin(elapsedTime * 0.25) * 6;
      mars.position.y = -3 + Math.cos(elapsedTime * 0.25) * 5;
      
      jupiter.position.x = -15 + Math.sin(elapsedTime * 0.2) * 7;
      jupiter.position.y = 10 + Math.cos(elapsedTime * 0.2) * 6;
      
      saturn.position.x = 5 + Math.sin(elapsedTime * 0.15) * 8;
      saturn.position.y = -10 + Math.cos(elapsedTime * 0.15) * 7;
      saturnRings.position.copy(saturn.position);
      
      renderer.current.render(scene.current, camera.current);
      requestAnimationFrame(animate);
    };
    
    animate();

    // Pencere boyutu değişikliği
    const handleResize = () => {
      camera.current.aspect = container.clientWidth / container.clientHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(renderer.current.domElement)) {
        container.removeChild(renderer.current.domElement);
      }
      renderer.current.dispose();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'register' && password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }
    onFormSubmit({ email, password });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <div ref={containerRef} style={{ position: "absolute", width: "100%", height: "100%", cursor: "move" }} />
      
      <div style={{
        position: "absolute", 
        top: "50%", 
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0, 0, 0, 0.6)",
        padding: "2.5rem",
        borderRadius: "1rem",
        color: "white",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        width: "90%",
        maxWidth: "400px",
        zIndex: 10
      }}>
        <h1 style={{ 
          textAlign: "center", 
          marginBottom: "1.5rem",
          fontSize: "2rem",
          fontWeight: "300",
          letterSpacing: "1px"
        }}>
          {mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
        </h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: "100%", 
              padding: "12px", 
              margin: "10px 0", 
              borderRadius: "6px",
              border: "none",
              background: "rgba(255, 255, 255, 0.12)",
              color: "white",
              fontSize: "1rem"
            }}
          />
          <input 
            type="password" 
            placeholder="Şifre" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: "100%", 
              padding: "12px", 
              margin: "10px 0", 
              borderRadius: "6px",
              border: "none",
              background: "rgba(255, 255, 255, 0.12)",
              color: "white",
              fontSize: "1rem"
            }}
          />
          {mode === 'register' && (
            <input 
              type="password" 
              placeholder="Şifre Tekrar" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ 
                width: "100%", 
                padding: "12px", 
                margin: "10px 0", 
                borderRadius: "6px",
                border: "none",
                background: "rgba(255, 255, 255, 0.12)",
                color: "white",
                fontSize: "1rem"
              }}
            />
          )}
          <button 
            type="submit" 
            style={{ 
              width: "100%",
              padding: "12px", 
              margin: "15px 0 10px",
              cursor: "pointer",
              background: "linear-gradient(45deg, #3498db, #2980b9)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "linear-gradient(45deg, #2980b9, #3498db)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "linear-gradient(45deg, #3498db, #2980b9)";
            }}
          >
            {mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>
        <p style={{ 
          textAlign: "center", 
          marginTop: "1.5rem",
          fontSize: "0.9rem",
          opacity: "0.8"
        }}>
          {mode === 'login' 
            ? <>Hesabınız yok mu? <a href="/register" style={{ color: "#3498db", textDecoration: "none" }}>Kayıt Olun</a></>
            : <>Zaten hesabınız var mı? <a href="/login" style={{ color: "#3498db", textDecoration: "none" }}>Giriş Yapın</a></>
          }
        </p>
      </div>
    </div>
  );
};

export default AuthScene;