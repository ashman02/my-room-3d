// import { useHelper } from "@react-three/drei"
import { useControls } from "leva"
import { useRef } from "react"
import * as THREE from "three"

const Lights = () => {
	const pointLightRef = useRef<THREE.Object3D>(null)
	// useHelper(pointLightRef, THREE.PointLightHelper)


	// position of the bulb
	const { pointPosition, intensity, decay, color } = useControls("Point Light", {
		pointPosition: {
			value: { x: 0.02, y: 2.64, z: 1.56 },
			step: 0.01,
		},
		intensity : { value: 2.0, min: 0, max: 10, step: 0.1 },
		decay : { value: 0.6, min: 0, max: 10, step: 0.1 },
		color : {value : "#a4d6e8"},
	})

	return (
		<>
			{/* Ambient light acting like moon light */}
			<ambientLight intensity={0.2} color={"#ffffff"} />

			{/* We are going to use point light to mimic light bulb */}
			<pointLight
				ref={pointLightRef}
				args={[color, intensity, 0, decay]}
				position={[pointPosition.x, pointPosition.y, pointPosition.z]}
			/>
		</>
	)
}

export default Lights
