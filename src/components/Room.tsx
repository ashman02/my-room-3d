import * as THREE from "three"
import Window from "./models/Window"
import Door from "./models/Door"
import { useTexture } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const wallMaterial = new THREE.MeshStandardMaterial({ color: "#A5A391" })

const Room = () => {
	// Load the texture and apply to the wall material.
	const floorTexture = useTexture("/textures/floor-texture.jpeg")
	const roofTexture = useTexture("/textures/roof-texture.jpg")

	return (
		<>
			{/* Floor */}
			<RigidBody type="fixed">
				<mesh geometry={boxGeometry} scale={[5, 0.1, 4]} receiveShadow>
					<meshStandardMaterial map={floorTexture} />
				</mesh>
			</RigidBody>

			<RigidBody type="fixed">
				{/* right wall */}
				<mesh
					position={[2.55, 1.5, 0]}
					material={wallMaterial}
					geometry={boxGeometry}
					scale={[0.1, 3, 4]}
					receiveShadow
				/>

				{/* front wall */}
				<mesh
					position={[0, 1.5, -2.05]}
					rotation-y={Math.PI * 0.5}
					material={wallMaterial}
					geometry={boxGeometry}
					scale={[0.1, 3, 5]}
					receiveShadow
				/>

				{/* left wall with window */}
				<group position={[-2.55, 1.5, 0]}>
					{/* right part */}
					<mesh
						position-z={-1.1375}
						material={wallMaterial}
						geometry={boxGeometry}
						scale={[0.1, 3, 1.725]}
						receiveShadow
					/>
					{/* upper part of the window */}
					<mesh
						position-y={0.9}
						material={wallMaterial}
						geometry={boxGeometry}
						scale={[0.1, 1.2, 0.55]}
						receiveShadow
					/>
					<Window scale={1} />
					{/* lower part of the window */}
					<mesh
						position-y={-0.9}
						material={wallMaterial}
						geometry={boxGeometry}
						scale={[0.1, 1.2, 0.55]}
						receiveShadow
					/>
					{/* left part */}
					<mesh
						position-z={1.1375}
						material={wallMaterial}
						geometry={boxGeometry}
						scale={[0.1, 3, 1.725]}
						receiveShadow
					/>
				</group>

				{/* Backwall with door  */}
				{/* left part of the wall */}
				{/* Door  */}
				{/* Door upper wall */}

				<group position-z={2.05} >
					<mesh
						material={wallMaterial}
						geometry={boxGeometry}
						scale={[0.1, 3, 3.75]}
						rotation-y={Math.PI * 0.5}
						position={[-0.625, 1.5, 0]}
						receiveShadow
					/>

					<Door
						scale={0.8}
						position={[1.875, 0.05, 0.07]}
						rotation-y={Math.PI}
					/>
					<mesh
						material={wallMaterial}
						geometry={boxGeometry}
						rotation-y={Math.PI * 0.5}
						scale={[0.1, 0.78, 1.26]}
						position={[1.875, 2.61, 0]}
						receiveShadow
					/>
				</group>
			</RigidBody>

			{/* Ceiling  Note-Get the fan as well and animation as well switch to turn on lights and fan*/}
			<mesh geometry={boxGeometry} position-y={3} scale={[5, 0.1, 4]}>
				<meshStandardMaterial map={roofTexture} />
			</mesh>
		</>
	)
}
useTexture.preload("/textures/wall-texture-2.jpg")
useTexture.preload("/textures/floor-texture.jpeg")
export default Room
