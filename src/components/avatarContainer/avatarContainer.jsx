import { Canvas } from '@react-three/fiber'
import { Environment, useGLTF, useAnimations } from '@react-three/drei'
import { useEffect } from 'react'
import { Container } from './style'

function AvatarModel() {
  const { scene, animations } = useGLTF('/models/avatar.glb')
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    if (actions?.Idle) {
      actions.Idle.reset().fadeIn(0.3).play()
    }
    return () => {
      if (actions?.Idle) actions.Idle.fadeOut(0.3)
    }
  }, [actions])

  return (
    <primitive 
      object={scene} 
      scale={2} 
      position={[0, -2, 0]} // move para baixo no eixo Y
    />
  )
}

function AvatarContainer() {
  return (
    <Container>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[50, 1, 500]} />
        <AvatarModel />
        <Environment preset="sunset" />
      </Canvas>
    </Container>
  )
}

export default AvatarContainer
