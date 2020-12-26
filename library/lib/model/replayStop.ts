import { initOpt } from "./init";
import { state } from "./state";

export const replayStop = async (success?: boolean) => {
  await state.ui.updateOne(
    {},
    {
      recording: 0,
      replaying: 0,
      showMouse: 0,
      step: -1,
      showPlayList: 1,
    }
  );
  aoife.next(".tat-plan");
  aoife.next(".tat-mouse");
  if (success && initOpt.onSuccess) {
    const cell = await state.nowCell.findOne();
    initOpt.onSuccess(cell);
  }
};