import { state } from "../model/state";

export const Step = () => {
  return aoife(
    "div",
    {
      class: "tat-step",
    },
    async () => {
      const ui = state.ui.get();
      const cell = await state.recordList.findOne({ _id: ui.nowCellId });
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

const css = `
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

document.head.append(aoife("style", css));
