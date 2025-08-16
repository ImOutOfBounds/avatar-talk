'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { AnimationMixer, Clock } from 'three';
import { Environment } from '@react-three/drei';
import { Container } from './style';

function AvatarModel({ playAnimation }) {
  const fbx = useLoader(FBXLoader, '/models/talking.fbx');
  const mixer = useRef();
  const clock = new Clock();

  useEffect(() => {
    if (fbx.animations && fbx.animations.length > 0) {
      mixer.current = new AnimationMixer(fbx);
      const idle = mixer.current.clipAction(fbx.animations[0]);
      idle.play();
    }
  }, [fbx]);

  useFrame(() => {
    if (mixer.current) mixer.current.update(clock.getDelta());
  });

  useEffect(() => {
    if (playAnimation && mixer.current && fbx.animations.length > 1) {
      const speak = mixer.current.clipAction(fbx.animations[1]);
      speak.reset().fadeIn(0.2).play();
    } else if (!playAnimation && mixer.current && fbx.animations.length > 0) {
      const idle = mixer.current.clipAction(fbx.animations[0]);
      idle.reset().fadeIn(0.2).play();
    }
  }, [playAnimation, fbx]);

  return <primitive object={fbx} scale={0.01} position={[0, -1.2, 0]} />;
}

export default function AvatarContainer({ playAnimation }) {
  return (
    <Container>
      <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 10, 10]} intensity={1} />
        <AvatarModel playAnimation={playAnimation} />
        <Environment preset="sunset" />
      </Canvas>
    </Container>
  );
}
