import "aoife";
import TouchAndTouchController from "./lib";
import { html } from "./bootstrap";

function App() {
  return (
    <div class="app">
      <TouchAndTouchController
        speed={3}
        onChangeSelected={(cell) => {
          console.log(cell.title || cell.updateAt, cell.items);
        }}
      />
      {/* <h1>TAT Client</h1>
      <Selects />
      <Buttons />
      <Inputs /> */}
      <div innerHTML={html}></div>
    </div>
  );
}

document.body.append(<App />);
