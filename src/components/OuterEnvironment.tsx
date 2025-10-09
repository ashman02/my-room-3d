import { Sparkles, useTexture } from "@react-three/drei"
import { useControls } from "leva"

const OuterEnvironment = () => {
	const moonTexture = useTexture("/textures/moon-texture.jpg")
	const { position, speed, size, noise } = useControls("Outer Environment", {
		position: { value: { x: -10, y: 1, z: 0 }, step: 0.01 },
		speed: { value: 0.1, min: 0, max: 10, step: 0.1 },
		size: { value: 4.0, min: 0, max: 10, step: 0.1 },
		noise: { value: 0.3, min: 0, max: 10, step: 0.1 },
	})
	return (
		<>
			<group position={[position.x, position.y, position.z]}>
				{/* our moon geometry */}
				<mesh>
					<sphereGeometry args={[0.4, 16, 16]} />
					<meshBasicMaterial map={moonTexture} />
				</mesh>
				{/* Stars  */}
				<Sparkles
					count={300}
					speed={speed}
					scale={[3, 5, 15]}
					size={size}
					noise={noise}
				/>
				{/* We could have used Stars component but we do not need stars all around our scene */}
			</group>
		</>
	)
}

export default OuterEnvironment
