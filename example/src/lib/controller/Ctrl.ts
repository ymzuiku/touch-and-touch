import Pop from "aoife-pop";
import css from "template-css";
import { recordClear } from "../model/recordClear";
import { recordStart } from "../model/recordStart";
import { showList } from "../model/showList";
import { recordStop } from "../model/recordStop";
import { state } from "../model/state";
import { replayStart } from "../model/replayStart";
import { recordCellAdd } from "../model/recordCellAdd";
import { replayStop } from "../model/replayStop";
import { Step } from "./Step";
import {
  RecordStartSvg,
  RecordStopSvg,
  RecordCancelSvg,
  ReplayStopSvg,
  CtrlExpendSvg,
  PlaySvg,
  AddSvg,
} from "./svg";

function ThePop({ children }: any) {
  return Pop({
    animation: void 0,
    placement: "top",
    followCursor: "horizontal",
    children: [children[0], aoife("div", { class: "tat-fm" }, children[1])],
  });
  // return (
  //   <Pop animation={void 0} placement="top" followCursor="horizontal">
  //     {children[0]}
  //     <div class="tat-fm">{children[1]}</div>
  //   </Pop>
  // );
}

export const Ctrl = () => {
  return (
    <div class="tat-ctrl">
      {async () => {
        const ui = await state.ui.findOne();

        if (ui.recording) {
          return (
            <span class="tat-row">
              <RecordStopSvg class="tat-btn" onclick={recordStop} />
              <Step />
            </span>
          );
        }
        if (ui.replaying) {
          return (
            <span class="tat-row">
              <ReplayStopSvg class="tat-btn" onclick={() => replayStop()} />
              <Step />
            </span>
          );
        }
        return (
          <span class="tat-row">
            <ThePop>
              <PlaySvg class="tat-btn" onclick={replayStart} />
              Play now record
            </ThePop>
            <ThePop>
              <RecordStartSvg class="tat-btn" onclick={recordStart} />
              Start Record
            </ThePop>
            <ThePop>
              <RecordCancelSvg class="tat-btn" onclick={recordClear} />
              Clear now marks
            </ThePop>
            <ThePop>
              <AddSvg class="tat-btn" onclick={recordCellAdd} />
              Copy now record to new item
            </ThePop>
          </span>
        );
      }}
      <div style="flex:1"></div>
      <div
        class="tat-btn"
        hidden={async () => {
          const ui = await state.ui.findOne();
          ui.recording || ui.replaying;
        }}
        onclick={showList}
      >
        <CtrlExpendSvg
          class={async () => {
            const ui = await state.ui.findOne();
            return "tat-show-list-icon " + (ui.showList && "tat-show-list");
          }}
        />
      </div>
    </div>
  );
};

css`
  .tat-row {
    display: flex;
    ${css.flex("row-center-center")}
  }
  .tat-ctrl {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    height: 30px;
    width: 100%;
  }
  .tat-btn {
    padding: 4px 4px;
    border-radius: 2px;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  .tat-btn:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .tat-btn:active {
    background: rgba(0, 0, 128, 0.2);
  }
  .tat-icon {
    width: 16px;
    height: 16px;
  }

  .tat-show-list-icon {
    display: block;
    transition: all 0.3s ease-out;
  }
  .tat-show-list {
    transform: rotate(-90deg);
  }
`;
