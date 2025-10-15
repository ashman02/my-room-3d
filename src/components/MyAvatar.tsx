import { RapierRigidBody, RigidBody } from "@react-three/rapier"
import Avatar from "./models/Avatar"
import { useEffect, useRef, useState } from "react"
import { Group, Vector3 } from "three"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { useKeyboardControls } from "@react-three/drei"
import type { ControlsType } from "../App"
import { degToRad, MathUtils } from "three/src/math/MathUtils.js"
import { useMobile } from "../hooks/useMobile"

// Functions to get shortest rotation paths made using chatgpt
const normalizeAngle = (angle: number) => {
	while (angle > Math.PI) angle -= 2 * Math.PI
	while (angle < -Math.PI) angle += 2 * Math.PI
	return angle
}

const lerpAngle = (start: number, end: number, t: number) => {
	start = normalizeAngle(start)
	end = normalizeAngle(end)

	if (Math.abs(end - start) > Math.PI) {
		if (end > start) {
			start += 2 * Math.PI
		} else {
			end += 2 * Math.PI
		}
	}

	return normalizeAngle(start + (end - start) * t)
}

const MyAvatar = () => {
	const { WALK_SPEED, ROTATION_SPEED } = useControls("Character Controls", {
		WALK_SPEED: { value: 0.8, min: 0, max: 4, step: 0.1 },
		ROTATION_SPEED: {
			value: degToRad(0.5),
			min: degToRad(0.1),
			max: degToRad(5),
			step: degToRad(0.1),
		},
	})

	const rigidBodyRef = useRef<RapierRigidBody>(null)
	const container = useRef<Group>(null)
	const character = useRef<Group>(null)

	const [animation, setAnimation] = useState("Idle")

	const characterRotationTarget = useRef(0)
	const rotationTarget = useRef(0)
	const cameraTarget = useRef<Group>(null)
	const cameraPosition = useRef<Group>(null)
	const cameraWorldPosition = useRef(new Vector3())
	const cameraLookAtWorldPosition = useRef(new Vector3())
	const cameraLookAt = useRef(new Vector3())
	const [, get] = useKeyboardControls<ControlsType>()
	const isClicking = useRef(false)

	const {isMobile} = useMobile()

	const footstepAudioRef = useRef(new Audio("/sounds/footsteps.mp3"))

	useEffect(() => {
		const onMouseDown = () => {
			isClicking.current = true
		}

		const onMouseUp = () => {
			isClicking.current = false
		}
		// mouse event
		document.addEventListener("mousedown", onMouseDown)
		document.addEventListener("mouseup", onMouseUp)
		// touch event
		document.addEventListener("touchstart", onMouseDown)
		document.addEventListener("touchend", onMouseUp)

		footstepAudioRef.current.loop = true
		footstepAudioRef.current.volume = 0.5
		return () => {
			document.removeEventListener("mousedown", onMouseDown)
			document.removeEventListener("mouseup", onMouseUp)
			document.removeEventListener("touchstart", onMouseDown)
			document.removeEventListener("touchend", onMouseUp)
		}
	}, [])

	useFrame(({ camera, pointer }) => {
		if (rigidBodyRef.current) {
			// Lineal velocity of the character
			const vel = rigidBodyRef.current.linvel()

			const movement = {
				x: 0,
				z: 0,
			}

			// move character backward of forward base on the key
			if (get().forward) {
				movement.z = 1
			}
			if (get().back) {
				movement.z = -1
			}

			if (isClicking.current) {
				// x and y are going from -1 to 1 that's what we were doing before
				if (Math.abs(pointer.x) > 0.1) {
					movement.x = -pointer.x
				}
				movement.z = pointer.y + 0.4
			}

			if (get().left) {
				movement.x = 1
			}
			if (get().right) {
				movement.x = -1
			}

			// Handle rotation
			if (movement.x !== 0) {
				rotationTarget.current += movement.x * ROTATION_SPEED
			}

			// if user is pressing any key add movement to the velocity
			if (movement.x !== 0 || movement.z !== 0) {
				// get the angle of the movement
				characterRotationTarget.current = Math.atan2(
					movement.x,
					movement.z
				)
				vel.x =
					Math.sin(
						rotationTarget.current + characterRotationTarget.current
					) * WALK_SPEED
				vel.z =
					Math.cos(
						rotationTarget.current + characterRotationTarget.current
					) * WALK_SPEED

				setAnimation("Walking")
				footstepAudioRef.current.play()
			} else {
				setAnimation("Idle")
				footstepAudioRef.current.pause()
			}

			if (character.current) {
				character.current.rotation.y = lerpAngle(
					character.current.rotation.y,
					characterRotationTarget.current,
					0.1
				)
			}

			rigidBodyRef.current.setLinvel(vel, true)
		}

		// Camera Controls
		if (container.current) {
			container.current.rotation.y = MathUtils.lerp(
				container.current.rotation.y,
				rotationTarget.current,
				0.1
			)
		}

		if (cameraPosition.current) {
			cameraPosition.current.getWorldPosition(cameraWorldPosition.current)
			camera.position.lerp(cameraWorldPosition.current, 0.1)
		}
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
						position-z={isMobile ? -1.5 : -1}
					/>
					<group ref={character}>
						<Avatar scale={0.8} animation={animation} />
					</group>
				</group>
			</RigidBody>
		</>
	)
}

export default MyAvatar
