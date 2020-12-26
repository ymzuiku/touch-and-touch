import { Drag } from "./Drag";
import { PlayList } from "./PlayList";
import { Ctrl } from "./Ctrl";
import css from "template-css";
import { DragSvg } from "./svg";
import { init, InitOptions } from "lib/model/init";

export const TouchAndTouchController = (opt: InitOptions) => {
  init(opt);
  return (
    <div tat-drag-ctrl tat-ignore class="tat">
      <div>
        <div class="tat-plan">
          <div class="tat-head-row">
            <Drag
              class="tat-head-center"
              query="[tat-drag-ctrl]"
              tat-ignore
              localStorageKey="tat-drag"
            >
              <DragSvg />
            </Drag>
            <Ctrl />
          </div>
          <PlayList />
        </div>
      </div>
    </div>
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
