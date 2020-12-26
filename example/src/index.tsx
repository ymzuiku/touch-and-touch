import "aoife";
import { Buttons } from "test/Buttons";
import { Selects } from "test/Selects";
import TouchAndTouchController from "./lib";

function App() {
  return (
    <div class="app">
      <TouchAndTouchController
        onChangeSelected={(cell) => {
          console.log(cell.title || cell.updateAt, cell.items);
        }}
      />
      <h1>TAT Client</h1>
      <Selects />
      <Buttons />
    </div>
  );
}

document.body.append(<App />);
