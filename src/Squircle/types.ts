import { CSSProperties } from "react";

type BaseSquircleProps = {
  children?: React.ReactNode;
  radius: number | [number, number];
  className?: string;
};

type BackgroundSquircleProps = BaseSquircleProps & {
  renderCanvas: "background";
};

type MaskSquircleProps = BaseSquircleProps & {
  renderCanvas: "mask";
};

export type BackgroundSquircleWithShadowProps = BackgroundSquircleProps & {
  shadow: CSSProperties["filter"];
  variant?: "bg-sh";
};

export type BackgroundSquircleWithBackgroundColorProps =
  BackgroundSquircleProps & {
    backgroundColor: CSSProperties["backgroundColor"];
    variant?: "bg-bc";
  };

export type BackgroundSquircleWithBackgroundColorAndShadowProps =
  BackgroundSquircleProps & {
    backgroundColor: CSSProperties["backgroundColor"];
    shadow: CSSProperties["filter"];
    variant?: "bg-bc-sh";
  };

export type BackgroundSquircleWithBorderProps = BackgroundSquircleProps & {
  borderWidth: number;
  borderColor: CSSProperties["borderColor"];
  variant?: "bg-bd";
};

export type BackgroundSquircleWithBorderAndShadowProps =
  BackgroundSquircleProps & {
    borderWidth: number;
    borderColor: CSSProperties["borderColor"];
    shadow: CSSProperties["filter"];
    variant?: "bg-bd-sh";
  };

export type BackgroundSquircleWithBorderAndBackgroundColorProps =
  BackgroundSquircleProps & {
    borderWidth: number;
    borderColor: CSSProperties["borderColor"];
    backgroundColor: CSSProperties["backgroundColor"];
    variant?: "bg-bd-bc";
  };

export type BackgroundSquircleWithBorderAndBackgroundColorAndShadowProps =
  BackgroundSquircleProps & {
    borderWidth: number;
    borderColor: CSSProperties["borderColor"];
    backgroundColor: CSSProperties["backgroundColor"];
    shadow: CSSProperties["filter"];
    variant?: "bg-bd-bc-sh";
  };

export type MaskSquircleWithBackgroundColorProps = MaskSquircleProps & {
  backgroundColor: CSSProperties["backgroundColor"];
  variant?: "ms-bc";
};

export type MaskSquircleWithBackgroundProps = MaskSquircleProps & {
  background: CSSProperties["background"];
  variant?: "ms-bg";
};

export type GenericSquircleProps = BaseSquircleProps & {
  renderCanvas?: "background" | "mask";
  shadow?: CSSProperties["filter"];
  backgroundColor?: CSSProperties["backgroundColor"];
  borderWidth?: number;
  borderColor?: CSSProperties["borderColor"];
  background?: CSSProperties["background"];
};

type SquircleProps =
  | BackgroundSquircleWithShadowProps
  | BackgroundSquircleWithBackgroundColorProps
  | BackgroundSquircleWithBackgroundColorAndShadowProps
  | BackgroundSquircleWithBorderProps
  | BackgroundSquircleWithBorderAndShadowProps
  | BackgroundSquircleWithBorderAndBackgroundColorProps
  | BackgroundSquircleWithBorderAndBackgroundColorAndShadowProps
  | MaskSquircleWithBackgroundColorProps
  | MaskSquircleWithBackgroundProps;

export default SquircleProps;
