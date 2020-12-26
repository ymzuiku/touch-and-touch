import { Drag } from "./Drag";
import { Ctrl } from "./Ctrl";
import css from "template-css";
import { init, InitOptions } from "../model/init";
import { DragSvg } from "./svg";
import { PlayList } from "./PlayList";

export const TouchAndTouch = (opt: InitOptions) => {
  init(opt);
  return aoife(
    "div",
    { "tat-drag-ctrl": true, "tat-ignore": true, class: "tat" },
    aoife(
      "div",
      { class: "tat-plan" },
      aoife(
        "div",
        { class: "tat-head-row" },
        Drag({
          class: "tat-head-center",
          query: "[tat-drag-ctrl]",
          "tat-ignore": true,
          localStorageKey: "tat-drag",
          children: [DragSvg({})],
        }),
        Ctrl()
      ),
      PlayList()
    )
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
  }
  .tat {
    backdrop-filter: blur(9px);
    background: rgba(255, 255, 255, 0.76);
    color: #00;
    z-index: 9000;
    padding: 6px;
    width: 160px;
    border: 1px solid rgba(0, 0, 0, 0.13);
    // box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
  }
  .tat-title {
    user-select: none;
    font-size: 11px;
  }
`;
