import "./App.css";
import Squircle from "./Squircle";

function App() {
  return (
    <Squircle
      className="squircle"
      radius={[5, 3]}
      renderCanvas="background"
      shadow="0 0 0.5rem #000000"
      borderColor="#fff"
      borderWidth={2}
      backgroundColor="#ff55ff"
    >
      Squircle
    </Squircle>
  );
}

export default App;
