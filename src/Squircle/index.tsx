import React, { CSSProperties, useCallback, useEffect } from "react";
import attachPaintWorkletScript from "../utils/attach-paint-worklet";
import { SCRIPT_ID } from "../constants/common";

import "./squircle.css";

type RenderTargetType = "auto" | "background" | "mask";

type SquircleProps = {
  children?: React.ReactNode;
  radius: number | [number, number];
  borderWidth?: number;
  borderColor?: CSSProperties["borderColor"];
  backgroundColor?: CSSProperties["backgroundColor"];
  renderTarget?: RenderTargetType;
} & React.HTMLAttributes<HTMLDivElement>;

const Squircle = ({
  children,
  className,
  borderWidth = 0,
  borderColor,
  radius,
  backgroundColor = "",
  renderTarget = "auto",
}: SquircleProps) => {
  const squircleRef = React.useRef<HTMLDivElement>(null);

  const detectBestRenderTarget = useCallback((): RenderTargetType => {
    const root = squircleRef.current;
    if (!root) return "background";

    const computedStyle = window.getComputedStyle(root);
    const hasBackground = !!computedStyle.backgroundImage;
    const hasMask = !!computedStyle.maskImage;

    if (hasBackground && !hasMask) return "mask";
    if (borderColor || borderWidth) return "background";

    return "background";
  }, [borderColor, borderWidth]);

  useEffect(() => {
    attachPaintWorkletScript(SCRIPT_ID);

    const root = squircleRef.current;
    if (!root) return;

    root.style.setProperty(
      "--squircle-radius",
      Array.isArray(radius) ? `${radius[0]}, ${radius[1]}` : `${radius}`
    );

    if (borderColor) {
      root.style.setProperty("--squircle-border-color", `${borderColor}`);
    }
    if (borderWidth) {
      root.style.setProperty("--squircle-border-width", `${borderWidth}`);
    }
    if (backgroundColor) {
      root.style.setProperty(
        "--squircle-background-color",
        `${backgroundColor}`
      );
    }

    let target: RenderTargetType = renderTarget;
    if (renderTarget === "auto") {
      target = detectBestRenderTarget();
    }

    console.log("target", target);

    if (target === "background") {
      root.style.setProperty("background", "paint(react-squircle)");
    }
    if (target === "mask") {
      root.style.setProperty("mask-image", "paint(react-squircle)");
      root.style.setProperty("-webkit-mask-image", "paint(react-squircle)");
    }
  }, [
    backgroundColor,
    borderColor,
    borderWidth,
    detectBestRenderTarget,
    radius,
    renderTarget,
  ]);

  const wrapperClasses = `react-squircle ${className ?? ""}`.trim();

  return (
    <div className="wrapper">
      <div className={wrapperClasses} ref={squircleRef}>
        {children}
      </div>
    </div>
  );
};

export default Squircle;
