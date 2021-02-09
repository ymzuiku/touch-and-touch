import { Drag } from "./Drag";
import { Ctrl } from "./Ctrl";
import { init, initOpt, InitOptions } from "../model/init";
import { DragSvg } from "./svg";
import { PlayList } from "./PlayList";

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
    children: [
      aoife(
        "div",
        { style: "width:30px; height:24px" },
        aoife(
          "div",
          { style: "pointer-events:none; transform:translate(7px,2px)" },
          DragSvg({})
        )
      ),
    ],
  }),
  Ctrl()
);

export const TouchAndTouch = (opt: InitOptions) => {
  init(opt);

  const out = aoife(
    "div",
    { "tat-ignore": true, class: "tat tat-root", style: { display: "none" } },
    dragAndCtrl,
    plan
  );
  setTimeout(() => {
    out.style.display = "block";
  }, 30);
  return out;
};

const css = `
  .tat *[hidden] {
    display: none !important;
  }
  .tat-root {
    width:200px;
  }

  .tat-head-row {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }
  .tat-head-center {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
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
    font-size: 14px;
  }
  .tat {
    font-size: 14px;
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

document.head.append(aoife("style", css));
