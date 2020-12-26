import "aoife";
import TouchAndTouch from "./lib";
import { html } from "./bootstrap";

function App() {
  const state = {
    name: "",
    password: "",
  };
  return (
    <div tat-id="form" class="app">
      <TouchAndTouch speed={3} />
      <h1>TAT Client</h1>
      {/* <div innerHTML={html}></div> */}
      <form
        onchange={(e) => {
          console.log("eee", e.target.value);
          (state as any)[e.target.placeholder] = e.target.value;
        }}
        onsubmit={(e) => {
          e.stopPropagation();
          alert(JSON.stringify(state));
        }}
      >
        <input placeholder="name" />
        <input placeholder="password" type="password" />
        <button name="submit">Submit</button>
      </form>
    </div>
  );
}

document.body.append(<App />);
