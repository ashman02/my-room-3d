import Singlebed from "./Singlebed"
import Desk from "./Desk"
import Computer from "./Computer"
import { useControls } from "leva"
import Chair from "./Chair"

const RoomContent = () => {
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
			{/* Bed */}
			<Singlebed />

			{/* Desk */}
			<group position={[position.x, position.y, position.z]}>
				<Desk scale={0.7} rotation-y={Math.PI * 0.5} />
				<Computer
					scale={0.001}
					position={[-0.04, 0.642, 0]}
					rotation-y={Math.PI * 0.5}
				/>
				{/* We will fix this later */}
				{/* <Chair scale={4} /> */}
			</group>
		</>
	)
}

export default RoomContent
