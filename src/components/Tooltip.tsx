import { Html } from "@react-three/drei"
import type { HtmlProps } from "@react-three/drei/web/Html";
import type React from "react"

type TooltipProps = {
  children: React.ReactNode;
} & HtmlProps;

const Tooltip: React.FC<TooltipProps> = ({ children, ...props }) => {
  return (
    <Html className="tooltip" {...props}>
        <div className="tooltip-text">{children}</div>
    </Html>
  )
}

export default Tooltip