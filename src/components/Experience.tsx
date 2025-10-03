import { OrbitControls } from "@react-three/drei"
import Room from "./Room"
import RoomContent from "./RoomContent"
import Lights from "./Lights"
import OuterEnvironment from "./OuterEnvironment"
import MyAvatar from "./MyAvatar"

const Experience = () => {
	return (
		<>
			<OrbitControls makeDefault />
			<color args={["#041A40"]} attach={"background"} />
			<Lights />
			<RoomContent />
			<Room />
			<OuterEnvironment />
			<MyAvatar />
		</>
	)
}

export default Experience
