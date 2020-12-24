import { state } from "lib/model/state";
import css from "template-css";

export const Step = () => {
  return (
    <div class="tat-step" hidden={() => !state.ui.get().showList}>
      <span>Step: </span>
      {() =>
        state.ui.get().replaying
          ? `${state.ui.get().step}/${state.nowCell.get().step}`
          : state.nowCell.get().step
      }
    </div>
  );
};

css`
  .tat-step {
    padding: 4px;
    font-size: 13px;
    cursor: pointer;
    width: calc(100% - 8px);
    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    // margin-bottom: 2px;
  }
`;
