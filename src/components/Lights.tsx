

const Lights = () => {
	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[1, 2, 3]} intensity={1.5} />
		</>
	)
}

export default Lights
