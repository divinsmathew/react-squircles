import React, { useEffect } from "react";
import attachPaintWorkletScript from "../utils/attach-paint-worklet";
import { SCRIPT_ID } from "../constants/common";

import "./squircle.css";

type Props = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Squircle = ({ children, className }: Props) => {
  useEffect(() => {
    attachPaintWorkletScript(SCRIPT_ID);
  }, []);

  const wrapperClasses = `react-squircle ${className ?? ""}`.trim();

  return <div className={wrapperClasses}>{children}</div>;
};

export default Squircle;
