import "aoife";
import { TouchAndTouchController } from "./lib";

function AsyncList() {
  return (
    <div>
      {() => {
        return new Promise((res) => {
          setTimeout(
            () =>
              res(
                <input
                  placeholder="Input"
                  value={() => {
                    return new Promise((res) => {
                      setTimeout(() => res("hello"));
                    });
                  }}
                />
              ),
            5000
          );
        });
      }}
      {() => {
        return new Promise((res) => {
          setTimeout(() => {
            res(<div>list-a</div>);
          }, 1000);
        });
      }}
      {() => {
        return new Promise((res) => {
          setTimeout(() => {
            res(<div>list-b</div>);
          }, 300);
        });
      }}
    </div>
  );
}

function App() {
  return (
    <div class="app">
      <AsyncList />

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
