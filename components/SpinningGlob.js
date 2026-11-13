"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import TitleHeader from "./TitleHeader";

// ================== Logo Component ==================
function Logo({ position, texture, size }) {
  const meshRef = useRef();
  const { camera } = useThree();

  // Billboard effect → logos always face camera
  useFrame(() => {
    if (meshRef.current) meshRef.current.lookAt(camera.position);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

// ================== Globe Component ==================
function TechGlobe({ techStack, radius, logoSize }) {
  const groupRef = useRef();

  // Globe rotation
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.003;
  });

  // Load textures
  const textures = useTexture(techStack.map((t) => t.img));

  // Distribute logos on sphere
  const positions = techStack.map((_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / techStack.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
    return new THREE.Vector3(
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi)
    );
  });

  return (
    <group ref={groupRef}>
      {textures.map((tex, i) => (
        <Logo key={i} position={positions[i]} texture={tex} size={logoSize} />
      ))}
    </group>
  );
}

// ================== Canvas Wrapper ==================
function GlobeCanvasWrapper() {
  const techStack = [
      { name: "Logo1", img: "/images/logos/logo1.png" },
    { name: "Logo2", img: "/images/logos/logo2.png" },
    { name: "Logo3", img: "/images/logos/logo3.png" },
    { name: "Logo4", img: "/images/logos/logo4.png" },
    { name: "Logo5", img: "/images/logos/logo5.png" },
    { name: "Logo6", img: "/images/logos/logo6.png" },
    { name: "Logo7", img: "/images/logos/logo7.png" },
    { name: "Logo8", img: "/images/logos/logo8.png" },
    { name: "Logo9", img: "/images/logos/logo9.png" },
    { name: "Logo11", img: "/images/logos/logo11.png" },
    { name: "Logo12", img: "/images/logos/logo12.png" },
    { name: "Logo13", img: "/images/logos/logo13.png" },
    { name: "Logo14", img: "/images/logos/logo14.png" },
    { name: "Logo15", img: "/images/logos/logo15.png" },
    { name: "Logo16", img: "/images/logos/logo16.png" },
    { name: "Logo17", img: "/images/logos/logo17.png" },
    { name: "Logo18", img: "/images/logos/logo18.png" },
    { name: "Logo19", img: "/images/logos/logo19.png" },
    { name: "Logo20", img: "/images/logos/logo20.png" },
    { name: "Logo21", img: "/images/logos/logo21.png" },
    { name: "Logo22", img: "/images/logos/logo22.png" },
    { name: "Logo23", img: "/images/logos/logo23.png" },
    { name: "Logo24", img: "/images/logos/logo24.png" },
    { name: "Logo25", img: "/images/logos/logo25.png" },
    { name: "Logo26", img: "/images/logos/logo26.png" },
    { name: "Logo27", img: "/images/logos/logo27.png" },
    { name: "Logo28", img: "/images/logos/logo28.png" },
    { name: "Logo29", img: "/images/logos/logo29.png" },
    { name: "Logo30", img: "/images/logos/logo30.png" },
    { name: "Logo31", img: "/images/logos/logo31.png" },
    { name: "Logo32", img: "/images/logos/logo32.png" },
    { name: "Logo33", img: "/images/logos/logo33.png" },
    { name: "Logo34", img: "/images/logos/logo34.png" },
    { name: "Logo35", img: "/images/logos/logo35.png" },
    { name: "Logo36", img: "/images/logos/logo36.png" },
  ];

  // Responsive Settings
  const [settings, setSettings] = useState({
    radius: 3,
    logoSize: 0.8,
    cameraPos: 8,
    height: "h-[500px]",
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setSettings({ radius: 2, logoSize: 0.4, cameraPos: 6, height: "h-[350px]" });
      } else if (window.innerWidth < 1024) {
        setSettings({ radius: 2.5, logoSize: 0.6, cameraPos: 7, height: "h-[400px]" });
      } else {
        setSettings({ radius: 3, logoSize: 0.8, cameraPos: 8, height: "h-[600px]" });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="cursor-grab relative w-full flex flex-col items-center gap-8 px-5 md:px-10 py-16 md:py-24"
      aria-labelledby="tech-stack-heading"
    >
      {/* Section Heading */}
      <TitleHeader
        id="tech-stack-heading"
        title="Technologies I Work With"
        sub="🌐 Technologies"
      />

      {/* Globe Canvas */}
      <div className={`w-full ${settings.height}`}>
        <Canvas
          camera={{ position: [0, 0, settings.cameraPos], fov: 50 }}
          dpr={[1, 2]} // performance boost
          role="img"
          aria-label="3D rotating globe showcasing technology logos"
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <TechGlobe
            techStack={techStack}
            radius={settings.radius}
            logoSize={settings.logoSize}
          />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>
    </section>
  );
}

export default dynamic(() => Promise.resolve(GlobeCanvasWrapper), { ssr: false });
