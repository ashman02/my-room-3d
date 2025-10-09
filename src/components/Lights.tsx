import { useControls } from "leva"
import { useRef } from "react"
import * as THREE from "three"
import useRoom from "../store/useRoom"

const Lights = () => {
	const isLightOn = useRoom((state) => state.isLightOn)
	const lightRef = useRef<THREE.Object3D>(null)

	// position of the bulb
	const { pointPosition, decay, color } = useControls("Bulb Light", {
		pointPosition: {
			value: { x: 0.02, y: 2.64, z: 1.56 },
			step: 0.01,
		},
		decay: { value: 0.6, min: 0, max: 10, step: 0.1 },
		color: { value: "#a4d6e8" },
	})

	// moonlight
	const {
		moonPosition,
		moonIntensity,
		moonDecay,
		moonColor,
		moonPenumbra,
		moonDistance,
		moonAngle,
	} = useControls("Moon Light", {
		moonPosition: {
			value: { x: -4.3, y: 1.45, z: 0 },
			step: 0.01,
		},
		moonAngle: { value: 0.2, min: 0, max: Math.PI / 2, step: 0.01 },
		moonIntensity: { value: 1.0, min: 0, max: 10, step: 0.1 },
		moonDecay: { value: 0.2, min: 0, max: 10, step: 0.1 },
		moonPenumbra: { value: 0.4, min: 0, max: 1, step: 0.01 },
		moonDistance: { value: 7.2, min: 0, max: 10, step: 0.01 },
		moonColor: { value: "#f4f4f8" },
	})

	return (
		<>
			{/* Ambient light acting like moon light */}
			<ambientLight intensity={0.2} color={"#ffffff"} />

			{/* We are going to use point light to mimic light bulb */}
			<pointLight
				color={color}
				intensity={isLightOn ? 2.0 : 0.0}
				decay={decay}
				position={[pointPosition.x, pointPosition.y, pointPosition.z]}
			/>

			{/* A light for the moonlight */}
			<spotLight
				ref={lightRef}
				color={moonColor}
				intensity={moonIntensity}
				distance={moonDistance}
				angle={moonAngle}
				penumbra={moonPenumbra}
				decay={moonDecay}
				position={[moonPosition.x, moonPosition.y, moonPosition.z]}
			/>
		</>
	)
}

export default Lights
