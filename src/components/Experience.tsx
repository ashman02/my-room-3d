import { OrbitControls } from "@react-three/drei"
import Room from "./Room"
import RoomContent from "./RoomContent"
import Lights from "./Lights"

const Experience = () => {
	return (
		<>
			<OrbitControls makeDefault />
			<Lights />
			<RoomContent />
			<Room />
		</>
	)
}

export default Experience
