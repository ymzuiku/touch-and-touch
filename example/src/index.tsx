import "aoife";
import { TouchAndTouchController } from "./lib";

function App() {
  return (
    <div class="app">
      <h1>TAT Client</h1>
      <StatefulExample name="Add Num" />
      <TouchAndTouchController />
    </div>
  );
}

function StatefulExample({ name }: { name: string }) {
  let num = 0;
  let age = 0;
  return (
    <div>
      <div>
        <button
          onclick={() => {
            num += 1;
            aoife.next(".add");
          }}
        >
          {name}
        </button>
        <div
          class="add"
          style={() => ({
            fontSize: 20 + num + "px",
          })}
        >
          <p>{() => num}</p>
        </div>
      </div>
      <div>
        <button
          onclick={() => {
            age += 1;
            aoife.next(".add");
          }}
        >
          {name}
        </button>
        <div
          class="add"
          style={() => ({
            fontSize: 20 + age + "px",
          })}
        >
          <p>{() => age}</p>
        </div>
      </div>
    </div>
  );
}

document.body.append(App());
