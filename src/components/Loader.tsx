// Loader.tsx
import React, { useEffect, useMemo, useState } from "react"
import { useProgress } from "@react-three/drei"

type LoaderProps = {
	onFinish?: () => void // optional callback when user clicks Enter
	controlsHint?: boolean // show/hide controls block
	autoRevealDelay?: number // ms after 100% before showing Enter (for a smooth finish)
}

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n))

const Loader: React.FC<LoaderProps> = ({
	onFinish,
	controlsHint = true,
	autoRevealDelay = 300,
}) => {
	const { progress, active, item, loaded, total } = useProgress()
	const [hidden, setHidden] = useState(false)
	const [ready, setReady] = useState(false)
	const pct = useMemo(() => clamp(progress), [progress])

	// When loading completes, wait a moment to allow bar to reach 100% cleanly, then mark ready
	useEffect(() => {
		if (!active && pct >= 100) {
			const t = setTimeout(() => setReady(true), autoRevealDelay)
			return () => clearTimeout(t)
		}
	}, [active, pct, autoRevealDelay])

	// Hide handler
	const handleEnter = () => {
		setHidden(true)
		onFinish?.()
	}

	// If overlay is fully dismissed, render nothing
	if (hidden) return null

	return (
		<div
			className={`r3f-loader ${ready ? "r3f-loader--ready" : ""} ${
				active || !ready ? "r3f-loader--active" : "r3f-loader--idle"
			}`}
			aria-hidden={hidden}
			aria-busy={active}
			role="status"
		>
			<div className="r3f-loader__inner">
				<div className="r3f-loader__brand">
					<span className="r3f-logo-dot" />
					<span className="r3f-logo-text">Loading Room</span>
				</div>

				<div className="r3f-loader__bar">
					<div
						className="r3f-loader__bar-fill"
						style={{ width: `${pct}%` }}
					/>
				</div>

				<div className="r3f-loader__meta">
					<span className="r3f-loader__pct">{Math.round(pct)}%</span>
					<span className="r3f-loader__sep">•</span>
					<span className="r3f-loader__items">
						{loaded}/{total}
					</span>
					{item ? (
						<span className="r3f-loader__item">
							Loading: {item}
						</span>
					) : null}
				</div>

				{controlsHint && (
					<div className="r3f-loader__controls">
						<div className="r3f-controls__row">
							<span className="kbd">W</span>
							<span className="kbd">A</span>
							<span className="kbd">S</span>
							<span className="kbd">D</span>
							<span className="r3f-controls__desc">
								or Arrow Keys to move
							</span>
						</div>
						<div className="r3f-controls__row">
							<span className="kbd">Mouse</span>
							<span className="r3f-controls__desc">
								Drag to look and move
							</span>
						</div>
						<div className="r3f-controls__row">
							<span className="kbd">Touch</span>
							<span className="r3f-controls__desc">
								Swipe to move on mobile
							</span>
						</div>
					</div>
				)}

				<button
					className={`r3f-loader__enter ${ready ? "is-visible" : ""}`}
					onClick={handleEnter}
					aria-label="Enter the room"
				>
					Enter
				</button>
			</div>
		</div>
	)
}

export default Loader
