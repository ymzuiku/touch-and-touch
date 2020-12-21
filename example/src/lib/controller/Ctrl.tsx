import { recordClear } from "lib/model/recordClear";
import { record } from "lib/model/record";
import { showList } from "lib/model/showList";
import { recordSave } from "lib/model/recordSave";
import { state } from "lib/model/state";
import css from "template-css";
import {
  RecordSvg,
  RecordStopSvg,
  RecordCancelSvg,
  CtrlExpendSvg,
} from "./svg";

export const Ctrl = () => {
  return (
    <div class="tat-ctrl">
      {() => {
        return state.recording.get() ? (
          <span class="tat-row">
            <RecordCancelSvg class="tat-btn" onclick={recordClear} />
            <div class="tat-btn" onclick={recordSave}>
              Save
            </div>
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
