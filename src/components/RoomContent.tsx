import Singlebed from "./models/Singlebed"
import Desk from "./models/Desk"
import Computer from "./models/Computer"
import { useControls } from "leva"
import Bookshelf from "./models/Bookshelf"
import Frame from "./models/Frame"
import { Image, Text, useCursor } from "@react-three/drei"
import CeilingFan from "./models/CeilingFan"
import LightBulb from "./models/LightBulb"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import Switch from "./models/Switch"
import useRoom from "../store/useRoom"
import { data } from "../utils/data"
import { useState } from "react"
import Envelopes from "./models/Envelopes"
// import Chair from "./Chair"

const RoomContent = () => {
	const { isLightOn, switchLight } = useRoom((state) => state)
	const [hovered, setHovered] = useState(false)
	useCursor(hovered, "pointer")
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
			value: { x: -0.8, y: 1.75, z: -1.98 },
			step: 0.001,
		},
	})
	// scale of our image
	const { imageScale } = useControls("Image", {
		imageScale: {
			value: 0.32,
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
			<RigidBody
				type="fixed"
				position={[0.592, 0.05, 0.251]}
				rotation-y={Math.PI}
				scale={2}
			>
				{/* Bed */}
				<Singlebed />
			</RigidBody>

			{/* Desk */}
			<group position={[position.x, position.y, position.z]}>
				<RigidBody
					type="fixed"
					scale={0.7}
					rotation-y={Math.PI * 0.5}
					colliders={false}
				>
					<Desk />
					<CuboidCollider
						args={[0.9, 0.5, 0.4]}
						position={[0, 0.5, 0]}
					/>
				</RigidBody>
				<Computer
					scale={0.001}
					position={[-0.04, 0.642, 0]}
					rotation-y={Math.PI * 0.5}
				/>
				<Envelopes
					scale={0.12}
					position={[0, 0.68, 0.5]}
					rotation-y={Math.PI}
				/>
				{/* We will fix this later */}
				{/* <Chair scale={4} /> */}
			</group>

			{/* Bookshelf on back wall along with the door */}
			<RigidBody
				type="fixed"
				position={[-2.02, 1.5, 1.84]}
				colliders={false}
			>
				<Bookshelf />
				<CuboidCollider
					args={[0.46, 0.26, 0.15]}
					position={[0, 0.07, 0]}
				/>
			</RigidBody>

			{/* Frames on the front wall */}
			<group
				position={[framePosition.x, framePosition.y, framePosition.z]}
			>
				{data.project.projects.map((project) => (
					<group
						key={project.id}
						position-x={project.x}
						onClick={() => {
							window.open(project.link, "_blank")
						}}
						onPointerOver={() => setHovered(true)}
						onPointerOut={() => setHovered(false)}
					>
						<Frame scale={0.5} />
						<Image
							url={project.img}
							scale={imageScale}
							position-z={0.01}
						/>
					</group>
				))}
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

			{/* Intro Text on the bed wall */}
			<Text
				font="/fonts/bebas-neue.woff"
				fontSize={0.2}
				maxWidth={2}
				textAlign="center"
				lineHeight={1}
				rotation-y={-Math.PI * 0.5}
				position={[2.49, 1.5, 0]}
			>
				{data.about.description}
			</Text>

			<Switch
				position={[1, 1.5, 1.97]}
				rotation-y={Math.PI}
				rotation-z={isLightOn ? Math.PI : 0}
				onClick={(e) => {
					e.stopPropagation()
					switchLight()
				}}
			/>
		</>
	)
}

export default RoomContent
