import { Canvas } from "@react-three/fiber"
import Experience from "./components/Experience"
import { Leva } from "leva"
import { Perf } from "r3f-perf"
import { KeyboardControls, type KeyboardControlsEntry } from "@react-three/drei"
import { useMemo } from "react"

type Controls = "forward" | "back" | "left" | "right"

const Controls = {
	forward: "forward",
	back: "back",
	left: "left",
	right: "right",
} as const

export type ControlsType = (typeof Controls)[keyof typeof Controls]

function App() {
	const map = useMemo<KeyboardControlsEntry<Controls>[]>(
		() => [
			{ name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
			{ name: Controls.back, keys: ["ArrowDown", "KeyS"] },
			{ name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
			{ name: Controls.right, keys: ["ArrowRight", "KeyD"] },
		],
		[]
	)
	return (
		<>
			<Leva />
			<KeyboardControls map={map}>
				<Canvas
					camera={{
						fov: 45,
						near: 0.1,
						far: 200,
						position: [0, 1, 1.2],
					}}
				>
					<Perf position="top-left" />
					<Experience />
				</Canvas>
			</KeyboardControls>
		</>
	)
}

export default App
