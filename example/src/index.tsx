import "aoife";
import TouchAndTouch from "./lib";
import Message from "vanilla-message";

function App() {
  const state = {
    name: "",
    name2: "",
    password: "",
  };
  return (
    <div tat-id="form" class="app">
      <TouchAndTouch
        onChangeData={(list) => {
          console.log(list);
        }}
        name="tat-example"
        speed={3}
      />
      <h1>TAT Client</h1>
      {/* <div innerHTML={html}></div> */}
      <div role="tab" onclick={() => Message.error("role-tab")}>
        role
      </div>
      <div role="tab" onclick={() => Message.error("role-tab2")}>
        role2
      </div>
      <input id="aa" type="aa" />
      <form
        onchange={(e) => {
          (state as any)[e.target.placeholder] = e.target.value;
          if (state.name2 === "dog") {
            window.dispatchEvent(
              new CustomEvent("tat", { detail: "done dog" })
            );
          }
        }}
        onsubmit={(e) => {
          e.stopPropagation();
          alert(JSON.stringify(state));
        }}
      >
        <input id="name" placeholder="name" />
        <input placeholder="name2" />
        <input id="password" placeholder="password" type="password" />
        <div tat-btn="dog" onclick={() => alert("10")}>
          alert
        </div>
        <button id="submit" name="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

document.body.append(<App />);
