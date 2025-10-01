import Singlebed from "./Singlebed"
import Desk from "./Desk"
import Computer from "./Computer"
import { useControls } from "leva"
import Bookshelf from "./Bookshelf"
import Frame from "./Frame"
import { Image } from "@react-three/drei"
import CeilingFan from "./CeilingFan"
import LightBulb from "./LightBulb"
// import Chair from "./Chair"

const RoomContent = () => {
	// position of the desk
	const { position } = useControls("desk", {
		position: {
			value: {
				x: -2.204,
				y: 0.051,
				z: -1.36,
			},
			step: 0.001,
		},
	})
	// position of the frame group
	const { framePosition } = useControls("frames", {
		framePosition: {
			value: { x: 0, y: 2.15, z: -1.98 },
			step: 0.001,
		},
	})
	// scale of our image
	const { imageScale } = useControls("Image", {
		imageScale: {
			value: { x: 0.63, y: 0.63 },
			step: 0.001,
		},
	})
	// position of the bulb
	const { bulbPosition } = useControls("Bulb", {
		bulbPosition: {
			value: { x: 0, y: 2.8, z: 2.32 },
			step: 0.01,
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

			{/* Bookshelf on back wall along with the door */}
			<Bookshelf position={[-2.02, 1.5, 1.84]} />

			{/* Frames on the front wall */}
			<group
				position={[framePosition.x, framePosition.y, framePosition.z]}
			>
				<Frame scale={0.5} position-x={0.6} />
				<Frame scale={1} />
				<Image
					url="/images/my-image.jpg"
					scale={[imageScale.x, imageScale.y]}
					position-z={0.01}
				/>
				<Frame scale={0.5} position-x={-0.6} />
			</group>

			{/* Ceiling Fan */}
			<CeilingFan scale={0.001} position-y={2.743} />

			{/* Light bulbs */}
			{/* one on the door wall */}
			<LightBulb
				scale={0.5}
				// rotation with little bit of a tilt.
				rotation-x={-Math.PI * 0.5 - 0.2}
				position={[bulbPosition.x, bulbPosition.y, bulbPosition.z]}
			/>
		</>
	)
}

export default RoomContent
