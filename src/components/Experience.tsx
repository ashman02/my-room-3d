import { OrbitControls } from "@react-three/drei"
import Singlebed from "./Singlebed"
import { useControls } from "leva"
import Desk from "./Desk"
import Chair from "./Chair"
import Computer from "./Computer"

const Experience = () => {
	// position of the desk
	const { position } = useControls("desk", {
		position: {
			value: {
				x: -2.204,
				y: 0.051,
				z: -1.383,
			},
			step: 0.001,
		},
	})
	return (
		<>
			<OrbitControls makeDefault />
			<ambientLight intensity={0.5} />
			<directionalLight position={[1, 2, 3]} intensity={1.5} />

			{/* Bed */}
			<Singlebed />

			{/* Desk */}
			<group >
				<Desk scale={0.7} rotation-y={Math.PI * 0.5} />
			</group>
				<Chair scale={0.001} position={[1, 0, 0]} />

				<Computer scale={0.001} />

			{/* Floor */}
			<mesh>
				<boxGeometry args={[5, 0.1, 4]} />
				<meshStandardMaterial color={"yellowgreen"} />
			</mesh>
		</>
	)
}

export default Experience
