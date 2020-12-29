import { state } from "../model/state";
import css from "template-css";

export const Step = () => {
  return aoife(
    "div",
    {
      class: "tat-step",
      // hidden: async () => {
      //   const ui = await state.ui.findOne();
      //   return !ui.showList;
      // },
    },
    async () => {
      const ui = await state.ui.findOne();
      const cell = await state.nowCell.findOne();
      let label = "";
      if (ui.step) {
        label = `Replaying: ${ui.step}/${cell.step}`;
      } else if (ui.recording) {
        label = `Recording: ${cell.step}`;
      } else {
        label = `Step: ${cell.step}`;
      }
      return label;
    }
  );
};

css`
  .tat-step {
    // color: #fff;
    // background: rgb(188 172 202);
    // border-radius: 40px;
    padding: 4px;
    font-size: 12px !important;
    cursor: pointer;
    width: calc(100% - 8px);
    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    // margin-bottom: 2px;
  }
`;
