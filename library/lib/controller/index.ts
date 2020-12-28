import { Drag } from "./Drag";
import { Ctrl } from "./Ctrl";
import css from "template-css";
import { init, InitOptions } from "../model/init";
import { DragSvg } from "./svg";
import { PlayList } from "./PlayList";
import Pop from "aoife-pop";
import { Step, TipStep } from "./Step";
import aoife from "aoife";

const plan = aoife(
  "div",
  { class: "tat-plan" },
  aoife("div", { class: "tat-head-row" }, Ctrl()),
  PlayList()
);

export const TouchAndTouch = (opt: InitOptions) => {
  init(opt);
  return aoife(
    "div",
    { "tat-drag-ctrl": true, "tat-ignore": true, class: "tat" },
    aoife(
      "div",
      { class: "tat-weight tat-row" },
      aoife(
        "div",
        { class: "tat-row" },
        Drag({
          class: "tat-head-center",
          query: "[tat-drag-ctrl]",
          "tat-ignore": true,
          localStorageKey: "tat-drag",
          children: [DragSvg({})],
        }),
        Pop({
          theme: "light-border",
          interactive: true,
          onShow: () => {
            aoife.waitAppend(plan).then(() => {
              aoife.next(".tat-plan");
            });
          },
          children: [TipStep(), plan],
        })
      )
    )
  );
};

css`
  .tat *[hidden] {
    display: none !important;
  }
  .tat-head-row {
    width: 166px;
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
    color: #00;
    z-index: 9000;
    padding: 6px;
    border: 1px solid rgba(0, 0, 0, 0.13);
    // box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
  }
  .tat-title {
    user-select: none;
    font-size: 11px;
  }
`;
