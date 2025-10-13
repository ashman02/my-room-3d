import Room from "./Room"
import RoomContent from "./RoomContent"
import Lights from "./Lights"
import OuterEnvironment from "./OuterEnvironment"
import MyAvatar from "./MyAvatar"
import { Physics } from "@react-three/rapier"
import PostEffects from "./PostEffects"

const Experience = () => {
	return (
		<>
			<PostEffects />
			<color args={["#041A40"]} attach={"background"} />
			<Lights />
			<Physics>
				<RoomContent />
				<Room />
				<MyAvatar />
			</Physics>
			<OuterEnvironment />
		</>
	)
}

export default Experience
