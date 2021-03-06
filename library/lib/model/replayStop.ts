import { initOpt } from "./init";
import { state } from "./state";

export const replayStop = async (success?: boolean) => {
  await state.customEvent.deleteMany({});
  await state.customEvent.insertOne({});
  state.ui.merge({
    recording: 0,
    replaying: 0,
    replayingAll: 0,
    showMouse: 0,
    step: 0,
  });
  aoife.next(".tat-update, .tat-mouse");
  if (success && initOpt.onSuccess) {
    const cell = await state.recordList.findOne({ _id: state.ui().nowCellId });
    initOpt.onSuccess(cell);
  }
};
