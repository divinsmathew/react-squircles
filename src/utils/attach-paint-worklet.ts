import getSmoothCornersScript from "./get-smooth-corners-script";

const attachPaintWorkletScript = (scriptId: string) => {
  const paintWorkletScript = document.getElementById(scriptId);
  if (paintWorkletScript) {
    return;
  }

  if (!CSS?.paintWorklet) {
    console.warn("Paint worklet not supported");
    return;
  }

  const content = `CSS.paintWorklet.addModule("${getSmoothCornersScript()}")`;
  const scriptNode = document.createTextNode(content);

  const scriptElement = document.createElement("script");
  scriptElement.appendChild(scriptNode);
  scriptElement.setAttribute("id", scriptId);
  document.head.appendChild(scriptElement);
};

export default attachPaintWorkletScript;
