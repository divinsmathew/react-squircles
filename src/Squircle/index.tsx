import React, { useCallback, useEffect } from "react";
import attachPaintWorkletScript from "../utils/attach-paint-worklet";
import { SCRIPT_ID, VARIANTS } from "../constants/common";

import SquircleProps, {
  BackgroundSquircleWithBackgroundColorAndShadowProps,
  BackgroundSquircleWithBackgroundColorProps,
  BackgroundSquircleWithBorderAndBackgroundColorAndShadowProps,
  BackgroundSquircleWithBorderAndBackgroundColorProps,
  BackgroundSquircleWithBorderAndShadowProps,
  BackgroundSquircleWithBorderProps,
  BackgroundSquircleWithShadowProps,
  GenericSquircleProps,
  MaskSquircleWithBackgroundColorProps,
  MaskSquircleWithBackgroundProps,
} from "./types";

const Squircle = ({ className, children, radius, ...props }: SquircleProps) => {
  const squircleRef = React.useRef<HTMLDivElement>(null);

  const getVariantProps = ({
    renderCanvas = "mask",
    shadow,
    backgroundColor,
    borderWidth,
    borderColor,
    background,
  }: GenericSquircleProps) => {
    if (renderCanvas === "background") {
      if ((borderWidth || borderColor) && backgroundColor && shadow) {
        return {
          variant: VARIANTS.BACKGROUND.BORDER_AND_BACKGROUND_COLOR_AND_SHADOW,
          props:
            props as BackgroundSquircleWithBorderAndBackgroundColorAndShadowProps,
        };
      }
      if (shadow && backgroundColor) {
        return {
          variant: VARIANTS.BACKGROUND.BACKGROUND_COLOR_AND_SHADOW,
          props: props as BackgroundSquircleWithBackgroundColorAndShadowProps,
        };
      }
      if (shadow && (borderWidth || borderColor)) {
        return {
          variant: VARIANTS.BACKGROUND.BORDER_AND_SHADOW,
          props: props as BackgroundSquircleWithBorderAndShadowProps,
        };
      }
      if ((borderWidth || borderColor) && backgroundColor) {
        return {
          variant: VARIANTS.BACKGROUND.BORDER_AND_BACKGROUND_COLOR,
          props: props as BackgroundSquircleWithBorderAndBackgroundColorProps,
        };
      }
      if (shadow) {
        return {
          variant: VARIANTS.BACKGROUND.SHADOW,
          props: props as BackgroundSquircleWithShadowProps,
        };
      }
      if (backgroundColor) {
        return {
          variant: VARIANTS.BACKGROUND.BACKGROUND_COLOR,
          props: props as BackgroundSquircleWithBackgroundColorProps,
        };
      }
      if (borderWidth || borderColor) {
        return {
          variant: VARIANTS.BACKGROUND.BORDER,
          props: props as BackgroundSquircleWithBorderProps,
        };
      }
      return {
        variant: VARIANTS.BACKGROUND.BACKGROUND_COLOR,
        props: props as BackgroundSquircleWithBackgroundColorProps,
      };
    }

    if (renderCanvas === "mask") {
      if (backgroundColor) {
        return {
          variant: VARIANTS.MASK.BACKGROUND_COLOR,
          props: props as MaskSquircleWithBackgroundColorProps,
        };
      }
      if (background) {
        return {
          variant: VARIANTS.MASK.BACKGROUND,
          props: props as MaskSquircleWithBackgroundProps,
        };
      }
      return {
        variant: VARIANTS.MASK.BACKGROUND,
        props: props as MaskSquircleWithBackgroundProps,
      };
    }

    return {
      variant: VARIANTS.BACKGROUND.BACKGROUND_COLOR,
      props: props as BackgroundSquircleWithBackgroundColorProps,
    };
  };

  const attachStyles = useCallback(() => {
    const root = squircleRef.current;
    if (!root) return;
    root.style.setProperty(
      "--squircle-radius",
      Array.isArray(radius) && radius.length == 2
        ? `${radius[0]}, ${radius[1]}`
        : `${radius}`
    );

    const { variant, props: newProps } = getVariantProps(
      props as GenericSquircleProps
    );

    if (
      variant === VARIANTS.BACKGROUND.BORDER ||
      variant === VARIANTS.BACKGROUND.BORDER_AND_SHADOW ||
      variant === VARIANTS.BACKGROUND.BORDER_AND_BACKGROUND_COLOR ||
      variant === VARIANTS.BACKGROUND.BORDER_AND_BACKGROUND_COLOR_AND_SHADOW
    ) {
      root.style.setProperty(
        "--squircle-border-color",
        `${newProps.borderColor ?? "#000"}`
      );

      root.style.setProperty(
        "--squircle-border-width",
        `${newProps.borderWidth ?? 1}`
      );
    }

    if (
      variant === VARIANTS.BACKGROUND.BACKGROUND_COLOR ||
      variant === VARIANTS.BACKGROUND.BACKGROUND_COLOR_AND_SHADOW ||
      variant === VARIANTS.BACKGROUND.BORDER_AND_BACKGROUND_COLOR ||
      variant === VARIANTS.BACKGROUND.BORDER_AND_BACKGROUND_COLOR_AND_SHADOW ||
      variant === VARIANTS.MASK.BACKGROUND_COLOR
    ) {
      if (newProps.renderCanvas === "mask") {
        root.style.setProperty(
          "background-color",
          `${newProps.backgroundColor}`
        );
      } else {
        root.style.setProperty(
          "--squircle-background-color",
          `${newProps.backgroundColor}`
        );
      }
    }

    if (
      variant === VARIANTS.BACKGROUND.SHADOW ||
      variant === VARIANTS.BACKGROUND.BACKGROUND_COLOR_AND_SHADOW ||
      variant === VARIANTS.BACKGROUND.BORDER_AND_SHADOW ||
      variant === VARIANTS.BACKGROUND.BORDER_AND_BACKGROUND_COLOR_AND_SHADOW
    ) {
      root.style.setProperty("filter", `drop-shadow(${newProps.shadow})`);
    }

    if (variant === VARIANTS.MASK.BACKGROUND) {
      root.style.setProperty("background", `${newProps.background}`);
    }

    if (props.renderCanvas === "background") {
      root.style.setProperty("background", "paint(react-squircle)");
    }
    if (props.renderCanvas === "mask") {
      root.style.setProperty("mask-image", "paint(react-squircle)");
      root.style.setProperty("-webkit-mask-image", "paint(react-squircle)");
    }
  }, [props, radius]);

  useEffect(() => {
    attachPaintWorkletScript(SCRIPT_ID);
    attachStyles();
  }, [attachStyles, props, radius]);

  const wrapperClasses = `react-squircle ${className ?? ""}`.trim();

  const elementProps = {
    ...props,
  } as GenericSquircleProps;

  delete elementProps.variant;
  delete elementProps.className;
  delete elementProps.children;
  delete elementProps.radius;
  delete elementProps.renderCanvas;
  delete elementProps.shadow;
  delete elementProps.backgroundColor;
  delete elementProps.borderWidth;
  delete elementProps.borderColor;
  delete elementProps.background;

  return (
    <div className={wrapperClasses} ref={squircleRef} {...elementProps}>
      {children}
    </div>
  );
};

export default Squircle;
