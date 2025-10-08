import { RapierRigidBody, RigidBody } from "@react-three/rapier"
import Avatar from "./models/Avatar"
import { useRef } from "react"
import { Group, Vector3 } from "three"
import { useFrame } from "@react-three/fiber"


const MyAvatar = () => {
	const rigidBodyRef = useRef<RapierRigidBody>(null)
	const container = useRef<Group>(null)
	const character = useRef<Group>(null)
	const cameraTarget = useRef<Group>(null)
	const cameraPosition = useRef<Group>(null)
	const cameraWorldPosition = useRef(new Vector3())
	const cameraLookAtWorldPosition = useRef(new Vector3())
	const cameraLookAt = useRef(new Vector3())

	useFrame(({ camera }) => {
		if (!cameraPosition.current) return

		cameraPosition.current.getWorldPosition(cameraWorldPosition.current)
		camera.position.lerp(cameraWorldPosition.current, 0.1)

		if (cameraTarget.current) {
			cameraTarget.current.getWorldPosition(
				cameraLookAtWorldPosition.current
			)
			cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1)

			camera.lookAt(cameraLookAt.current)
		}
	})
	return (
		<>
			<RigidBody ref={rigidBodyRef} lockRotations>
				<group ref={container}>
					<group ref={cameraTarget} position-z={4} />
					<group
						ref={cameraPosition}
						position-y={1.8}
						position-z={-1}
					/>
					<group ref={character}>
						<Avatar scale={0.8} />
					</group>
				</group>
			</RigidBody>
		</>
	)
}

export default MyAvatar
