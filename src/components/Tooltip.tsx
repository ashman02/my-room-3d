import { Html } from "@react-three/drei"
import type { HtmlProps } from "@react-three/drei/web/Html"
import type React from "react"

type TooltipProps = {
	children: React.ReactNode
} & HtmlProps

const Tooltip: React.FC<TooltipProps> = ({ children, ...props }) => {
	return (
		<Html
			className="tooltip"
			zIndexRange={[1, 0]}
			tabIndex={-1}
			// keep compositing stable
			style={{
				willChange: "transform",
				transform: "translateZ(0)",
				backfaceVisibility: "hidden",
			}}
			{...props}
		>
			<div tabIndex={-1} className="tooltip-text">
				{children}
			</div>
		</Html>
	)
}

export default Tooltip
