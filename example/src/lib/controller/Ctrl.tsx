import { recordClear } from "lib/model/recordClear";
import { record } from "lib/model/record";
import { showList } from "lib/model/showList";
import { recordSave } from "lib/model/recordSave";
import { state } from "lib/model/state";
import {
  RecordSvg,
  RecordStopSvg,
  RecordCancelSvg,
  CtrlExpendSvg,
} from "./svg";

export const Ctrl = () => {
  return (
    <div
      class="tat-ctrl"
      style={() => ({
        opacity: state.replaying.get() ? "0.5" : "1",
      })}
    >
      {() => {
        return state.recording.get() ? (
          <span>
            <RecordStopSvg class="tat-btn" onclick={recordSave} />
            <RecordCancelSvg class="tat-btn" onclick={recordClear} />
          </span>
        ) : (
          <RecordSvg class="tat-btn" onclick={record} />
        );
      }}
      <div style="flex:1"></div>
      <div class="tat-btn" hidden={() => !state.showExpend} onclick={showList}>
        <CtrlExpendSvg
          class={() =>
            "tat-show-list-icon " + (!state.showList && "tat-show-list")
          }
        />
      </div>
    </div>
  );
};

const css = `
.tat-ctrl {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
}
.tat-btn {
  padding: 2px 4px;
  border-radius: 2px;
  cursor: pointer;
  user-select: none;
}
.tat-btn:hover {
  background: rgba(0,0,0,0.1)
}
.tat-btn:active {
  background: rgba(0,0,128,0.2)
}
.tat-icon {
  width: 16px;
  height: 16px;
}

.tat-show-list-icon {
  display:block;
  transition: all 0.3s ease-out;
}
.tat-show-list {
  transform:rotate(-90deg);
}
`;
document.head.append(<style>{css}</style>);
