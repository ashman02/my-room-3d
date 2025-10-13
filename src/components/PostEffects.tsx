import { Bloom, EffectComposer } from "@react-three/postprocessing"


const PostEffects = () => {
	return (
		<EffectComposer>
			<Bloom
				intensity={0.7} // The bloom intensity.
				luminanceThreshold={0.99} // luminance threshold. Raise this value to mask out darker elements in the scene.
				luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
				mipmapBlur={false} // Enables or disables mipmap blur..
			/>
		</EffectComposer>
	)
}

export default PostEffects
