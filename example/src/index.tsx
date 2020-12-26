import "aoife";
import { Buttons } from "Buttons";
import { Selects } from "Selects";
import { TouchAndTouchController, init } from "./lib";

init({
  onChangeSelected: (cell) => {
    console.log(cell.title || cell.updateAt, cell.items);
  },
});

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
