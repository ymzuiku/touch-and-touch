import { recordClear } from "lib/model/recordClear";
import { recordStart } from "lib/model/recordStart";
import { showList } from "lib/model/showList";
import { recordStop } from "lib/model/recordStop";
import { state } from "lib/model/state";
import Pop from "aoife-pop";
import css from "template-css";
import {
  RecordSvg,
  RecordStopSvg,
  RecordCancelSvg,
  CtrlExpendSvg,
  PlaySvg,
  AddSvg,
} from "./svg";
import { replay } from "lib/model/replay";
import { recordAdd } from "lib/model/recordAdd";

export const Ctrl = () => {
  return (
    <div class="tat-ctrl">
      {() => {
        return state.recording.get() ? (
          <span class="tat-row">
            <RecordStopSvg class="tat-btn" onclick={recordStop} />
          </span>
        ) : (
          <span class="tat-row">
            <Pop>
              <PlaySvg class="tat-btn" onclick={replay} />
              <div class="tat-fm">Play now record</div>
            </Pop>
            <Pop>
              <RecordSvg class="tat-btn" onclick={recordStart} />
              <div class="tat-fm">Record</div>
            </Pop>
            <Pop>
              <RecordCancelSvg class="tat-btn" onclick={recordClear} />
              <div class="tat-fm">Clear now record list</div>
            </Pop>
            <Pop>
              <AddSvg class="tat-btn" onclick={recordAdd} />
              <div class="tat-fm">Copy now record to new item</div>
            </Pop>
          </span>
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
