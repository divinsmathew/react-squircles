import "./App.css";
import "./Squircle.css";

import useSquircle from "./Squircle/useSquircles.ts";
import Squircle from "./Squircle";
//placehold.co/600x400

import SquircleProps from "./Squircle/types.ts";

function App() {
  const squircleProps: SquircleProps = {
    radius: [5, 3],
    renderCanvas: "mask",
    onClick: () => console.log("clicked"),
    backgroundColor: "black",
  };
  const squircleRef = useSquircle<HTMLImageElement>(squircleProps);

  return (
    <>
      <Squircle
        onClick={() => console.log("clicked")}
        radius={[5, 3]}
        renderCanvas="background"
        shadow="5px 5px 55px #000"
      >
        <img src="https://placehold.co/600x400" alt="" ref={squircleRef} />
      </Squircle>
    </>
  );
}

export default App;
