import { state } from "../model/state";
import css from "template-css";

export const Step = () => {
  return aoife(
    "div",
    {
      class: "tat-step",
      hidden: async () => {
        const ui = await state.ui.findOne();
        return !ui.showList;
      },
    },
    aoife("span", "Step: "),
    async () => {
      const ui = await state.ui.findOne();
      const cell = await state.nowCell.findOne();
      return ui.replaying ? `${ui.step}/${cell.step}` : cell.step;
    }
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
