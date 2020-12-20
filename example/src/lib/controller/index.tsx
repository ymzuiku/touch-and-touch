import "dom-jsx";
import { cancel } from "lib/model/cancel";
import { record } from "lib/model/record";
import { replay } from "lib/model/replay";
import { save } from "lib/model/save";
import { state } from "lib/model/state";
import { Drag } from "./Drag";

const css = `
.tat {
  font-family: "SF Pro SC","SF Pro Display","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
  backdrop-filter:blur(5px);
  background: rgba(255,255,255,0.7);
  color: #00;
  z-index: 9000;
  padding: 6px;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 4px;
}
.tat-btn {
  padding: 2px 4px;
  border-radius: 2px;
  cursor: pointer;
}
.tat-btn:hover {
  background: rgba(0,0,0,0.1)
}
.tat-btn:active {
  background: rgba(0,0,128,0.2)
}
`;
document.head.append(<style>{css}</style>);

export const TouchAndTouchController = () => {
  return (
    <div tat-drag-ctrl class="tat">
      <Drag query="[tat-drag-ctrl]" tat-ignore savePositionKey="tat-drag">
        <div style={{ fontSize: "11px" }}>TouchAndTouch</div>
      </Drag>
      <div class="tat-ctrl">
        <div
          class="tat-btn"
          onclick={() => {
            if (state.recording.get()) {
              save();
            } else {
              record();
            }
          }}
        >
          {() => (state.recording.get() ? "Save" : "Record")}
        </div>
        <div class="tat-btn" onclick={replay}>
          Replay
        </div>
        <div class="tat-btn" onclick={cancel}>
          Cancel
        </div>
      </div>
    </div>
  );
};
