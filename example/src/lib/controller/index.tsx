import { Drag } from "./Drag";
import { List } from "./List";
import { Ctrl } from "./Ctrl";
import { init } from "lib/model/init";

export const TouchAndTouchController = () => {
  init();
  return (
    <div tat-drag-ctrl class="tat">
      <Drag query="[tat-drag-ctrl]" tat-ignore savePositionKey="tat-drag">
        <div class="tat-title">TouchAndTouch</div>
      </Drag>
      <div>
        <div class="tat-plan">
          <Ctrl />
          <List />
        </div>
      </div>
    </div>
  );
};

const css = `
.tat {
  font-family: "SF Pro SC","SF Pro Display","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
  backdrop-filter:blur(5px);
  background: rgba(255,255,255,0.7);
  color: #00;
  z-index: 9000;
  padding: 6px;
  width: 150px;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 4px;
}
.tat-title {
  user-select: none;
  font-size: 11px;
}
`;
document.head.append(<style>{css}</style>);
