

const Room = () => {
	return (
		<>
			{/* Floor */}
			<mesh>
				<boxGeometry args={[5, 0.1, 4]} />
				<meshStandardMaterial color={"yellowgreen"} />
			</mesh>
		</>
	)
}

export default Room
