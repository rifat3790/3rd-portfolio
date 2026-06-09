import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { usePortfolioStore } from '../../store/usePortfolioStore';

const COLOR_HEX_MAP = {
  violet: 0x8b5cf6,
  emerald: 0x10b981,
  amber: 0xf59e0b,
  rose: 0xf43f5e,
  cyan: 0x06b6d4,
};

export const ThreeBgCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { accentColor, theme } = usePortfolioStore();
  
  // Maintain a ref to the material color animate target
  const materialRef = useRef<THREE.PointsMaterial | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // 3. Grid of Particles (BufferGeometry)
    const columns = 75;
    const rows = 75;
    const particleCount = columns * rows;
    const spacing = 1.2;

    const positions = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);

    let idx = 0;
    for (let x = 0; x < columns; x++) {
      for (let z = 0; z < rows; z++) {
        // Center the grid
        const posX = (x - columns / 2) * spacing;
        const posZ = (z - rows / 2) * spacing;
        const posY = 0;

        positions[idx * 3] = posX;
        positions[idx * 3 + 1] = posY;
        positions[idx * 3 + 2] = posZ;

        initialPositions[idx * 3] = posX;
        initialPositions[idx * 3 + 1] = posY;
        initialPositions[idx * 3 + 2] = posZ;

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create a circular particle texture manually via Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Init Material
    const hexColor = COLOR_HEX_MAP[accentColor] || 0x8b5cf6;
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(hexColor),
      size: 0.45,
      transparent: true,
      opacity: theme === 'dark' ? 0.65 : 0.45,
      map: texture,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    materialRef.current = material;

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 4. Mouse Interactivity Variables
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const mouse3D = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    
    // Invisible plane for raycasting mouse coordinates to grid height
    const planeGeom = new THREE.PlaneGeometry(150, 150);
    planeGeom.rotateX(-Math.PI / 2);
    const planeMat = new THREE.MeshBasicMaterial({ visible: false });
    const plane = new THREE.Mesh(planeGeom, planeMat);
    scene.add(plane);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalise coordinates
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Render Loop
    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      time += 0.015;
      
      // Interpolate mouse coordinates smoothly
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Update 3D Raycast target
      raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
      const intersects = raycaster.intersectObject(plane);
      if (intersects.length > 0) {
        mouse3D.copy(intersects[0].point);
      }

      // Deconstruct positions array
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      let pIdx = 0;
      for (let x = 0; x < columns; x++) {
        for (let z = 0; z < rows; z++) {
          const baseIndex = pIdx * 3;
          
          // Initial coordinate values
          const initX = initialPositions[baseIndex];
          const initZ = initialPositions[baseIndex + 2];

          // 1. Math Ripple Wave Logic (Sine/Cosine composite ripples)
          let targetY = Math.sin(initX * 0.2 + time) * 0.95 + 
                        Math.cos(initZ * 0.25 + time) * 0.95;

          // 2. Interactive Tactile Mouse Repulsion
          const dx = initX - mouse3D.x;
          const dz = initZ - mouse3D.z;
          const distance = Math.sqrt(dx * dx + dz * dz);
          
          if (distance < 9) {
            // Repulsion strength scales up the closer it gets to cursor
            const repulsion = (1 - distance / 9) * 2.8;
            targetY -= repulsion;
          }

          // Apply coordinates update
          array[baseIndex + 1] = targetY;
          pIdx++;
        }
      }

      // Signal Three.js that geometry vertices changed
      posAttr.needsUpdate = true;

      // Subtle scene rotation
      particleSystem.rotation.y = time * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 6. Responsive Window Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Clean up resources on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean WebGL elements from DOM
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js memory allocations
      geometry.dispose();
      material.dispose();
      texture.dispose();
      planeGeom.dispose();
      planeMat.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update color smoothly using GSAP transitions
  useEffect(() => {
    if (!materialRef.current) return;
    
    const hexColor = COLOR_HEX_MAP[accentColor] || 0x8b5cf6;
    const targetColor = new THREE.Color(hexColor);

    // Transition color values smoothly
    gsap.to(materialRef.current.color, {
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      duration: 0.85,
      ease: 'power2.out',
    });

    // Update material opacity depending on the theme background conditions
    materialRef.current.opacity = theme === 'dark' ? 0.65 : 0.45;
  }, [accentColor, theme]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80 dark:opacity-60 transition-opacity duration-700" 
    />
  );
};
