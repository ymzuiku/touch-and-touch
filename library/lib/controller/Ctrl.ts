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
  AutoIdSvg,
  NewFileSvg,
} from "./svg";
import { exportRecord } from "../model/exportRecord";
import { importRecord } from "../model/importRecord";
import { replayAllFilter } from "../model/replayAllFilter";
import { recordAgain } from "../model/recordAgain";
import { showList } from "../model/showList";
import aoife from "aoife";
import { changeAutoRecordId } from "../model/changeAutoRecordId";
import { initOpt } from "../model/init";
import { recordCellAdd } from "../model/recordCellAdd";

function ThePop({ children }: any) {
  return Pop({
    animation: void 0,
    placement: "top",
    followCursor: "horizontal",
    children: [children[0], aoife("div", { class: "tat-fm" }, children[1])],
  });
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
          NewFileSvg({ class: "tat-btn", onclick: () => recordCellAdd() }),
          "New item",
        ],
      }),
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
      aoife("span", { style: "flex:1" }),
      ThePop({
        children: [
          AutoIdSvg({
            class: "tat-btn",
            style: async () => {
              if (initOpt.ignoreAutoId) {
                return { opacity: 0 };
              }
              const ui = await state.ui.findOne();

              return { opacity: ui.autoRecordId ? 1 : 0.4 };
            },
            onclick: () => changeAutoRecordId(),
          }),
          "Use auto Record Id (Not recommended)",
        ],
      }),
      ThePop({
        children: [
          ShowSvg({
            class: "tat-btn",
            style: async () => {
              const ui = await state.ui.findOne();
              return { opacity: ui.showList ? 1 : 0.4 };
            },
            onclick: () => showList(),
          }),
          "List show/hidden",
        ],
      }),
      ThePop({
        children: [
          DownloadSvg({
            class: "tat-btn",
            onclick: exportRecord,
          }),
          "Download records",
        ],
      }),
      ThePop({
        children: [
          LoaclFileSvg({ class: "tat-btn", onclick: importRecord }),
          "Load records from file",
        ],
      })
    );
  });
};

css`
  .tat-row {
    display: flex;
    width: 100%;
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
