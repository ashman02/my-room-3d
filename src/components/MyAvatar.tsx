import { CuboidCollider, RigidBody } from "@react-three/rapier"
import Avatar from "./models/Avatar"

const MyAvatar = () => {
	return (
		<>
			<RigidBody colliders={false} scale={0.8} position={[0.8, 0.06, 1]}>
				<Avatar />
				<CuboidCollider args={[0.4, 0.8, 0.15]} position={[0, 0.8, 0]} />
				<CuboidCollider args={[0.1, 0.12, 0.1]} position={[0, 1.73, 0.03]} />
			</RigidBody>
		</>
	)
}

export default MyAvatar
