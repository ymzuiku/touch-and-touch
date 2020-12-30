import Pop from "aoife-pop";
import css from "template-css";
import { recordContinue } from "../model/recordContinue";
import { recordStop } from "../model/recordStop";
import { state } from "../model/state";
import { replayStart } from "../model/replayStart";
import { replayStop } from "../model/replayStop";
import { Step } from "./Step";
import {
  RecordContinueSvg,
  RecordStopSvg,
  ReplayStopSvg,
  PlaySvg,
  ReplayAllSvg,
  DownloadSvg,
  LoaclFileSvg,
  MoreSvg,
  RecordAgainSvg,
  ShowSvg,
} from "./svg";
import { exportRecord } from "../model/exportRecord";
import { importRecord } from "../model/importRecord";
import { replayAllFilter } from "../model/replayAllFilter";
import { recordAgain } from "../model/recordAgain";
import { showList } from "../model/showList";
import aoife from "aoife";

function ThePop({ children }: any) {
  return Pop({
    animation: void 0,
    placement: "top",
    followCursor: "horizontal",
    children: [children[0], aoife("div", { class: "tat-fm" }, children[1])],
  });
}

function MoreItem({ children, onclick }: any) {
  return aoife(
    "div",
    { class: "tat-more-item", onclick },
    children[0],
    children[1]
  );
}

export const Ctrl = () => {
  return aoife("div", { class: "tat-update tat-ctrl" }, async () => {
    const ui = await state.ui.findOne();

    if (ui.recording) {
      return aoife(
        "span",
        { class: "tat-row" },
        RecordStopSvg({ class: "tat-btn", onclick: recordStop }),
        Step()
      );
    }
    if (ui.replaying) {
      return aoife(
        "span",
        { class: "tat-row" },
        ReplayStopSvg({ class: "tat-btn", onclick: () => replayStop() }),
        Step()
      );
    }
    return aoife(
      "span",
      { class: "tat-row" },
      ThePop({
        children: [
          PlaySvg({ class: "tat-btn", onclick: () => replayStart() }),
          "Play selected record",
        ],
      }),
      ThePop({
        children: [
          ReplayAllSvg({
            class: "tat-btn",
            onclick: () => replayAllFilter(),
          }),
          "Play all filter record",
        ],
      }),
      ThePop({
        children: [
          RecordContinueSvg({
            class: "tat-btn",
            onclick: () => recordContinue(),
          }),
          "Record continue",
        ],
      }),
      ThePop({
        children: [
          RecordAgainSvg({ class: "tat-btn", onclick: () => recordAgain() }),
          "Record again",
        ],
      }),
      Pop({
        placement: "right",
        zIndex: 15100,
        children: [
          MoreSvg({ class: "tat-btn" }),
          aoife(
            "div",
            MoreItem({
              onclick: () => showList(),
              children: [
                ShowSvg({
                  class: "tat-btn",
                }),
                "List show/hidden",
              ],
            }),
            MoreItem({
              onclick: exportRecord,
              children: [
                DownloadSvg({
                  class: "tat-btn",
                }),
                "Download records",
              ],
            }),
            MoreItem({
              onclick: importRecord,
              children: [
                LoaclFileSvg({ class: "tat-btn" }),
                "Load records from file",
              ],
            })
          ),
        ],
      })
      // aoife("div", { style: "flex:1" })
      // aoife(
      //   "div",
      //   {
      //     class: "tat-btn",
      //     hidden: async () => {
      //       const ui = await state.ui.findOne();
      //       return ui.recording || ui.replaying;
      //     },
      //     onclick: showList,
      //   },
      //   CtrlExpendSvg({
      //     class: async () => {
      //       const ui = await state.ui.findOne();
      //       return "tat-show-list-icon " + (ui.showList && "tat-show-list");
      //     },
      //   })
      // )
    );
  });
};

css`
  .tat-row {
    display: flex;
    ${css.flex("row-center-center")}
  }
  .tat-more-item {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    height: 30px;
    background: rgba(255, 255, 255, 0);
    padding: 4px;
  }
  .tat-more-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  .tat-more-item:active {
    background: rgba(255, 255, 255, 0.1);
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
