import { Drag } from "./Drag";
import { Ctrl } from "./Ctrl";
import css from "template-css";
import { init, InitOptions } from "../model/init";
import { DragSvg } from "./svg";
import { PlayList } from "./PlayList";
import aoife from "aoife";

const plan = aoife(
  "div",
  { class: "tat-plan tat-update", "tat-ignore": true },
  PlayList()
);
const dragAndCtrl = aoife(
  "div",
  { class: "tat-row tat-head-center", "tat-ignore": true },
  Drag({
    query: ".tat-root",
    "tat-ignore": true,
    localStorageKey: "tat-drag",
    children: [DragSvg({})],
  }),
  Ctrl()
);

export const TouchAndTouch = (opt: InitOptions) => {
  init(opt);
  return aoife(
    "div",
    { "tat-ignore": true, class: "tat tat-root" },
    aoife("div", dragAndCtrl, plan)
  );
};

css`
  .tat *[hidden] {
    display: none !important;
  }

  .tat-head-row {
    ${css.flex("row-start-center")}
  }
  .tat-head-center {
    ${css.flex("row-center-center")}
  }
  .tat-drag-line {
    height: 1px;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .tat *,
  .tat-fm {
    font-family: "SF Pro SC", "SF Pro Display", "SF Pro Icons", "PingFang SC",
      "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-size: 16px;
  }
  .tat {
    font-size: 16px;
    backdrop-filter: blur(9px);
    background: rgba(255, 255, 255, 0.85);
    color: #000;
    z-index: 15000;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.13);
    border-radius: 4px;
  }
  .tat-title {
    user-select: none;
    font-size: 11px;
  }
`;
