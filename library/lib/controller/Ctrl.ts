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
  CopySvg,
} from "./svg";

function ThePop({ children }: any) {
  return Pop({
    animation: void 0,
    placement: "top",
    followCursor: "horizontal",
    children: [children[0], aoife("div", { class: "tat-fm" }, children[1])],
  });
}

export const Ctrl = () => {
  return aoife("div", { class: "tat-ctrl" }, async () => {
    const ui = await state.ui.findOne();

    if (ui.recording) {
      return aoife(
        "span",
        { class: "tat-row" },
        RecordStopSvg({ class: "tat-btn", onclick: recordStop })
      );
    }
    if (ui.replaying) {
      return aoife(
        "span",
        { class: "tat-row" },
        ReplayStopSvg({ class: "tat-btn", onclick: () => replayStop() })
      );
    }
    return aoife(
      "span",
      { class: "tat-row" },
      ThePop({
        children: [
          PlaySvg({ class: "tat-btn", onclick: replayStart }),
          "Play now record",
        ],
      }),
      ThePop({
        children: [
          RecordStartSvg({ class: "tat-btn", onclick: recordStart }),
          "Start Record",
        ],
      }),
      ThePop({
        children: [
          RecordCancelSvg({ class: "tat-btn", onclick: recordClear }),
          "Clear marks",
        ],
      }),
      ThePop({
        children: [
          CopySvg({ class: "tat-btn", onclick: recordCellAdd }),
          "Copy record to new item",
        ],
      }),
      aoife("div", { style: "flex:1" }),
      aoife(
        "div",
        {
          class: "tat-btn",
          hidden: async () => {
            const ui = await state.ui.findOne();
            return ui.recording || ui.replaying;
          },
          onclick: showList,
        },
        CtrlExpendSvg({
          class: async () => {
            const ui = await state.ui.findOne();
            return "tat-show-list-icon " + (ui.showList && "tat-show-list");
          },
        })
      )
    );
  });
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
