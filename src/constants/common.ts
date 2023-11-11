export const SCRIPT_ID = "react-squircle-script";

export const VARIANTS = {
  BACKGROUND: {
    SHADOW: "bg-sh",
    BACKGROUND_COLOR: "bg-bc",
    BACKGROUND_COLOR_AND_SHADOW: "bg-bc-sh",
    BORDER: "bg-bd",
    BORDER_AND_SHADOW: "bg-bd-sh",
    BORDER_AND_BACKGROUND_COLOR: "bg-bd-bc",
    BORDER_AND_BACKGROUND_COLOR_AND_SHADOW: "bg-bd-bc-sh",
  },
  MASK: { BACKGROUND_COLOR: "ms-bc", BACKGROUND: "ms-bg" },
} as const;
