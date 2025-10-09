import { Canvas } from "@react-three/fiber"
import Experience from "./components/Experience"
import { Leva } from "leva"
import { Perf } from "r3f-perf"
import { KeyboardControls, type KeyboardControlsEntry } from "@react-three/drei"
import { useEffect, useMemo, useRef } from "react"

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

	// As of now play sound whenever user clicks on something but we are going to change this later with a better solution. 
	// We are going to show a button and ask ready to start your experience and then play the sound
	const backgroundAudioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		backgroundAudioRef.current = new Audio("/sounds/bg-sound.mp3")
		backgroundAudioRef.current.loop = true
		backgroundAudioRef.current.volume = 0.1

		const startAudio = () => {
			backgroundAudioRef.current?.play()
			window.removeEventListener("click", startAudio)
			window.removeEventListener("keydown", startAudio)
		}

		window.addEventListener("click", startAudio)
		window.addEventListener("keydown", startAudio)

		return () => {
			window.removeEventListener("click", startAudio)
			window.removeEventListener("keydown", startAudio)
		}
	}, [])

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
					style={{
						touchAction: "none",
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
