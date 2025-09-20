import { OrbitControls } from "@react-three/drei"

const Experience = () => {
	return (
		<>
			<OrbitControls makeDefault />
			<ambientLight intensity={0.5} />
			<directionalLight position={[1, 2, 3]} intensity={1.5} />
			<mesh position={[2, 0, 0]}>
				<sphereGeometry />
				<meshStandardMaterial color={"hotpink"} />
			</mesh>
			<mesh position={[-2, 0, 0]}>
				<boxGeometry />
				<meshStandardMaterial color={"mediumpurple"} />
			</mesh>
			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				<meshStandardMaterial color={"yellowgreen"} />
			</mesh>
		</>
	)
}

export default Experience
