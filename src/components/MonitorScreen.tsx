import { Html } from "@react-three/drei"

const MonitorScreen = () => {
	return (
		<Html
			transform
			distanceFactor={1}
			position={[0, 0.17, 0.002]}
			occlude="blending"
			zIndexRange={[1, 0]}
			style={{
				willChange: "transform",
				transform: "translateZ(0)", // ensure GPU compositing
				backfaceVisibility: "hidden",
			}}
		>
			<div tabIndex={-1} className="monitor-screen">
				sidhuashman02@gmail.com
			</div>
		</Html>
	)
}

export default MonitorScreen
