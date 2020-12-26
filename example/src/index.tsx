import "aoife";
import { Buttons } from "Buttons";
import { Selects } from "Selects";
import { TouchAndTouchController } from "./lib";

function App() {
  return (
    <div class="app">
      <TouchAndTouchController />
      <h1>TAT Client</h1>
      <Selects />
      <Buttons />
    </div>
  );
}

document.body.append(<App />);
